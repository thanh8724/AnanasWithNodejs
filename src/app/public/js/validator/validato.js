
function Validator (options) {
    const formElement = document.querySelector(options.formSelector)
    let selectorRules = {}

    function getParentElement (inputElement , parentSelector) {
        while(inputElement.parentElement) {
            if (inputElement.parentElement.matches(parentSelector)) {
                return inputElement.parentElement
            } else {
                inputElement = inputElement.parentElement
            }
        }
    }
    if(formElement) {
        
        // formElement.onsubmit = e => {
        //     e.preventDefault();
        //     let isValid = true;
        //     options.rules.forEach(rule => {
        //         const inputElements = Array.from(formElement.querySelectorAll(rule.selector))
        //         inputElements.forEach(inputElement => {
        //             validate(inputElement , rule)
        //             if (getParentElement(inputElement , options.formGroupSelector).classList.contains('invalid')) {
        //                 isValid = false;
        //             }
        //         })
        //     })
        //     if (isValid) {
        //         formElement.submit()
        //         console.log(formElement)
        //     }
        // }
        
        function validate (inputElement , rule) {
            const rules = selectorRules[rule.selector]
            let errorMessage = ''
            for(let i = 0 ; i < rules.length ; ++i) {
                errorMessage = rules[i](inputElement.value)
                if (errorMessage) {
                    break;
                }
            }
            if(errorMessage) {
                getParentElement(inputElement , options.formGroupSelector).querySelector(options.formMessage).innerText = errorMessage
                getParentElement(inputElement , options.formGroupSelector).classList.add('invalid')
            } else {
                oninputHandler(inputElement)
            }
        }

        // remove all the invalid signal while user fill in the input
        function oninputHandler (inputElement) {
            getParentElement(inputElement , options.formGroupSelector).querySelector(options.formMessage).innerText = ''
            getParentElement(inputElement , options.formGroupSelector).classList.remove('invalid')
        }
        
        options.rules.forEach(rule => {
            const inputElements = Array.from(formElement.querySelectorAll(rule.selector))

            inputElements.forEach(inputElement => {
                if (Array.isArray(selectorRules[rule.selector])) {
                    selectorRules[rule.selector].push(rule.test)
                } else {
                    selectorRules[rule.selector] = [rule.test]
                }

                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }

                inputElement.oninput = () => {
                    oninputHandler(inputElement)
                }
            })
        })
    }
}

Validator.isRequired = (selector , message) => {
    return {
        selector,
        test (value) {
            return value.trim() ? undefined : message || 'Vui lòng điền thông tin!'
        }
    }
}
Validator.isEmail = (selector , message) => {
    return {
        selector,
        test (value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Thông tin phải là email!' 
        }
    }
}
Validator.isPhone = (selector , message) => {
    return {
        selector,
        test (value) {
            const regex = /^(0[2|3|5|6|7|8|9])+([0-9]{8})$/;
            return regex.test(value) ? undefined : message || 'Số điện thoại không hợp lệ!' 
        }
    }
}
Validator.isPassword = (selector , min = 8, message) => {
    return {
        selector,
        test (value) {
            return value.length >= min ? undefined : message || `Mật khẩu phải có ít nhất ${min} kí tự`
        }
    }
}
Validator.isConfirm = (selector , confirm , message) => {
    return {
        selector,
        test (value) {
            return value == confirm() ? undefined : message || `Mật khẩu xác nhận sai! Vui lòng nhập lại.`
        }
    }
}

Validator.isUsername = function (selector, message) {
    
};