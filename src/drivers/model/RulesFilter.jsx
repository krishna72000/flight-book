const checkAttribute = (rules) => {
    let rulesList = {};
    for (var _i = 0, _a = Object.entries(rules); _i < _a.length; _i++) {
        var _b = _a[_i], name_2 = _b[0], value = _b[1];
        rulesList[name_2] = chkat(name_2, value);
    }
    return rulesList;
}

const checkLabels = (labels, rules) => {
    let rulesList = { ...rules };
    for (var _i = 0, _a = Object.entries(labels); _i < _a.length; _i++) {
        var _b = _a[_i], name_2 = _b[0], value = _b[1];
        rulesList[name_2].label = value;
    }
    return rulesList;
}
const checkValues = (values, rules) => {
    for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
        var _b = _a[_i], name_2 = _b[0], value = _b[1];
        rules[name_2].value = value;
    }
    return rules;
}

const checkJson = (attributes) => {
    let jsonValue = {};
    for (var _i = 0, _a = Object.entries(attributes); _i < _a.length; _i++) {
        var _b = _a[_i], name_2 = _b[0], value = _b[1];
        jsonValue[name_2] = value.value;
    }
    return jsonValue;
}


const chkat = (name, rules) => {
    let att = {
        label: name.charAt(0).toUpperCase() + name.slice(1),
        name: name,
        value: "",
        error: false,
        errorMessage: "",
        rules: []
    }

    if (Array.isArray(rules)) {
        rules.forEach(function (val) {
            switch (typeof val) {
                case 'string':
                    att.rules.push(checkStrRule(val, name));
                    break;
                case 'object':
                    att.rules.push(checkObjRule(val, name));
                    break;
                default:
                    throw new Error(`Not a valid rule defination`);
            }
        });
    }
    return att;
}

const checkStrRule = (rul, name) => {
    let rule = {
        message: "",
        name: rul,
    }
    switch (rul) {
        case "required":
            rule.message = `{label} is required`;
            break;
        case "string":
            rule.message = `{label} must be string`;
            break;
        case "number":
            rule.message = `{label} must be number`;
            break;
        case "email":
            rule.message = `{label} is not a valid email`;
            break;
        default:
            throw new Error(`Unknown rule type ${rul} for ${name}`);
    }
    return rule;

}
const checkObjRule = (rul, name) => {
    if (!rul.hasOwnProperty("rule")) {
        throw new Error(`Not a valid rule defination for ${name}`);
    }
    let rule = {
        message: "",
        name: rul.rule,
    }
    if (rul.rule === "pattern" && !rul.hasOwnProperty("pattern")) {
        throw new Error(`Not a valid rule defination for ${name}`);
    }

    if (rul.rule === "match" && !rul.hasOwnProperty("match")) {
        throw new Error(`Not a valid rule defination for ${name}`);
    }

    if (rul.rule === "length" && !rul.hasOwnProperty("min") && !rul.hasOwnProperty("max")) {
        throw new Error(`Not a valid rule  for ${name}`);
    }

    if (rul.rule === "callback" && !rul.hasOwnProperty("callback")) {
        throw new Error(`Not a valid rule  for ${name}`);
    }

    if (rul.hasOwnProperty("message")) {
        rule.message = rul.message;
    } else {
        switch (rul.rule) {
            case "required":
                rule.message = `{label} is required`;
                break;
            case "string":
                rule.message = `{label} must be string`;
                break;
            case "number":
                rule.message = `{label} must be number`;
                break;
            case "email":
                rule.message = `{label} is not a valid`;
                break;
            case "pattern":
                rule.message = `{label} is not in correct format`;
                break;
            case "length":
                rule.message = `Length does not match`;
                break;
            case "match":
                rule.message = `{label} does not match with {match}`;
                break;
            case "callback":
                rule.message = `{label} does not satisfy its defination`;
                break;
            default:
                throw new Error(`Unknown rule type ${rul.rule}`);
        }
    }
    if (rul.hasOwnProperty("max")) {
        rule["max"] = rul.max;
    }

    if (rul.hasOwnProperty("min")) {
        rule["min"] = rul.min;
    }

    if (rul.hasOwnProperty("match")) {
        rule["match"] = rul.match;
    }

    if (rul.hasOwnProperty("callback")) {
        if (typeof rul.callback !== "function") {
            throw new Error(`callback of ${name} must be a function`);
        }
        rule["callback"] = rul.callback;
    }

    if (rul.hasOwnProperty("pattern")) {
        try {
            new RegExp(rul.pattern);
        } catch (e) {
            throw new Error(`Pattern for ${name} is not a valid Regx`);
        }
        rule["pattern"] = rul.pattern;
    }
    return rule;
}
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateRegx = (value, regx) => {
    return regx.test(String(value).toLowerCase());
};
const checkRules = (name, fullAttr) => {
    const attr = fullAttr[name];
    var result = {
        ...attr,
        error: false,
        errorMessage: "",
    };
    for (let rule of attr.rules) {
        switch (rule.name) {
            case 'required':
                if (attr.value === "" || attr.value === undefined || attr.value === null) {
                    result.error = true;
                }
                break;
            case 'number':
                if (isNaN(attr.value)) {
                    result.error = true;
                }
                break;
            case 'string':
                if (!isNaN(attr.value)) {
                    result.error = true;
                }
                break;
            case 'email':
                if (!validateEmail(attr.value)) {
                    result.error = true;
                }
                break;
            case 'pattern':
                if (!validateRegx(attr.value, rule.pattern)) {
                    result.error = true;
                }
                break;
            case 'match':
                const match = fullAttr[rule.match];
                if (match.value !== attr.value) {
                    result.error = true;
                    rule.message = rule.message.replace("{match}", match.label)
                }
                break;
            case 'callback':
                if (!rule.callback(attr.value)) {
                    result.error = true;
                }
                break;
            case 'length':
                switch (typeof attr.value) {
                    case 'string':
                        if (rule.hasOwnProperty("max")) {
                            if (attr.value.length > rule.max) {
                                result.error = true;
                                break;
                            }
                        }
                        if (rule.hasOwnProperty("min")) {
                            if (attr.value.length < rule.min) {
                                result.error = true;
                                break;
                            }
                        }
                        break;
                    case 'number':
                        if (rule.hasOwnProperty("max")) {
                            if (attr.value > rule.max) {
                                result.error = true;
                                break;
                            }
                        }
                        if (rule.hasOwnProperty("min")) {
                            if (attr.value < rule.mix) {
                                result.error = true;
                                break;
                            }
                        }
                        break;
                    default:
                        throw new Error(`Invalid rules defination for ${attr.label}`);
                }
                break;
            default:
                throw new Error(`Invalid rules defination for ${attr.label}`);
        }
        if (result.error) {
            result.errorMessage = rule.message.replace("{label}", attr.label);
            break;
        } else {
            result.errorMessage = "";
        }

    }
    return result;
}


export { checkAttribute, checkValues, checkLabels, checkJson, checkRules }