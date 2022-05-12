import { useState } from 'react';
import { checkAttribute, checkLabels, checkValues, checkJson, checkRules } from './RulesFilter'

const useKsForm = () => {
    let attributes = {};
    const [ksForm, setKsAttr] = useState(attributes);
    const actions = {
        setAttribute: (rules) => {
            let rulesList = checkAttribute(rules);
            setStaticAttr(rulesList, 1);
        },
        setLabels: (labels) => {
            let rulesList = checkLabels(labels, attributes);
            setStaticAttr(rulesList, 2);
        },
        setValue: (name, value) => {
            let vla = {};
            vla[name] = value;
            let rulesList = checkValues(vla, ksForm);
            setAttr(rulesList, 3);
        },
        setValues: (values) => {
            let rulesList = checkValues(values, attributes);
            setStaticAttr(rulesList, 4);
        },
        getValue: (name) => {
            return getAttribute(name, "value");
        },
        getError: (name) => {
            const bol = Boolean(getAttribute(name, "error"));
            return bol;
        },
        getLabel: (name) => {
            return getAttribute(name, "label");
        },
        getMessage: (name) => {
            return getAttribute(name, "errorMessage");
        },
        getJson: () => {
            return checkJson(ksForm);
        },
        validate: (name) => {
            let attributeList = ksForm;
            attributeList[name] = checkRules(name, attributeList);
            setAttr(attributeList, 6);
        },
        validateAll: () => {
            let attributeList = ksForm;
            let flag = true;
            for (var _i = 0, _a = Object.entries(attributeList); _i < _a.length; _i++) {
                var _b = _a[_i], name_2 = _b[0];
                attributeList[name_2] = checkRules(name_2, attributeList);
                if (flag) {
                    flag = attributeList[name_2].error;
                }
            }
            setAttr(attributeList, 5);
            return !flag;
        },
        notify: () => {
            setKsAttr((pre) => {
                return {
                    ...pre,
                    ...attributes
                };
            });
        }
    };
    function getAttribute(name, type) {
        if (ksForm.hasOwnProperty(name)) {
            return ksForm[name][type];
        } else {
            return "";
        }
    }
    function setAttr(attr, loc) {
        // setKsAttr((pre) => {
        //     return {
        //         ...pre,
        //         ...attributes
        //     };
        // });
        setKsAttr({
            ...ksForm,
            ...attr
        });
    }

    function setStaticAttr(attr, loc) {
        attributes = attr;
    }

    return [ksForm, actions];
}


export default useKsForm;