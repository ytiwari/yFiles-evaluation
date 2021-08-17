/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2021 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * @param {!string} bindingString
 * @returns {!function}
 */

/* eslint-disable no-new-func */
/**
 * Returns a binding for the given string.
 * If the parameter is a function definition, a function object is
 * returned. Otherwise, a binding is created using the parameter as the
 * property path.
 * @return The binding
 */
function createBinding(bindingString) {
  const match = bindingString.match(regexp)
  if (match) {
    try {
      return createBoundExpression(match[3])
    } catch (ignored) {
      // fallthrough
    }
  }
  return createConstantBinding(
    bindingString.length > 0 ? bindingString : undefined
  )
}

/**
 * @typedef {Object} BindingDescriptor
 * @property {(string|boolean|number)} [value]
 * @property {('expression'|'constant'|'function')} type
 */

/**
 * @param {!BindingDescriptor} binding
 * @param {*} value
 * @returns {*}
 */
export function evalBinding(binding, value) {
  const fun = createBindingFunction(binding)
  if (fun) {
    return fun(value)
  } else {
    return undefined
  }
}

/**
 * @param {!BindingDescriptor} binding
 */
export function isEmptyBinding(binding) {
  return (
    binding.type === 'expression' &&
    (typeof binding.value === 'undefined' ||
      (typeof binding.value === 'string' && binding.value.length < 1))
  )
}

/**
 * @returns {!BindingDescriptor}
 */
export function emptyBinding() {
  return { type: 'expression', value: '' }
}

/**
 * @param {!BindingDescriptor} binding
 * @returns {?function}
 */
export function createBindingFunction(binding) {
  if (isEmptyBinding(binding)) {
    return null
  }
  switch (binding.type) {
    case 'constant':
      return createConstantBinding(binding.value)
    case 'expression':
      return createBoundExpression(binding.value)
    case 'function':
      return createBoundFunction(interpretAsFunction(binding.value))
  }
}

/**
 * @param {!string} value
 * @returns {!string}
 */
export function interpretAsFunction(value) {
  if (value.length < 1) {
    throw new Error('Invalid empty function')
  }
  const templates = [
    value,
    `function(item,index){ return ${value};}`,
    `function(item,index){ ${value} }`,
  ]
  let lastError = null
  let result = null
  const success = templates.some((t) => {
    try {
      const func = new Function(`return (${t})`)()
      if (typeof func === 'function') {
        result = t
        return true
      }
    } catch (e) {
      lastError = e
      return false
    }
    return false
  })

  if (success && result) {
    return result
  } else {
    throw lastError || new Error('No valid function interpretation found')
  }
}

/**
 * @param {!string} functionDeclaration
 * @returns {!function}
 */
function createBoundFunction(functionDeclaration) {
  // eval the string to get the function object
  const func = new Function(`return (${functionDeclaration})`)()

  // wrap the binding function with a function that catches and reports errors
  // that occur in the binding functions
  return function () {
    try {
      // eslint-disable-next-line no-useless-call
      const result = func.apply(null, arguments)
      return result === null ? undefined : result
    } catch (e) {
      //  TODO alert(`Evaluating the binding function ${bindingExpression} failed: ${e}`)
      return undefined
    }
  }
}

/*
 * RegExp to match, whether a configuration string is considered
 * to be a dynamic binding.
 */
const regexp = /(\s*){{(\s*)(.*?)(\s*)}}(\s*)$/

/**
 * @param {!string} bindingExpression
 * @returns {!function}
 */
function createBoundExpression(bindingExpression) {
  if (!bindingExpression) {
    return createConstantBinding(undefined)
  }
  // eval the string to get the function object
  const func = new Function(
    `with(arguments[0]) { return (${bindingExpression})}`
  )

  // wrap the binding function with a function that catches and reports errors
  // that occur in the binding functions
  return (dataItem) => {
    try {
      // eslint-disable-next-line no-useless-call
      const result = func.apply(null, [dataItem])
      return result === null ? undefined : result
    } catch (e) {
      //  TODO alert(`Evaluating the binding function ${bindingExpression} failed: ${e}`)
      return undefined
    }
  }
}

/**
 * @param {!T} constant
 * @returns {!function}
 */
function createConstantBinding(constant) {
  return (dataItem) => constant
}
