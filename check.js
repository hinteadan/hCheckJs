(function (undefined) {
    "use strict";

    function isEmpty(param) {
        return param === undefined ||
            param === null ||
            (typeof (param) === 'string' && param.replace(/\s/gi, '') === '');
    }

    function notEmpty(param, paramName) {
        if (isEmpty(param)) {
            throw new Error("Parameter '"
                + paramName
                + "' cannot be null or undefined");
        }
    }

    function condition(conditionResult, message) {
        if (!conditionResult) {
            throw new Error(message || "An error occured");
        }
    }

    function isNotEmpty(param) {
        return !isEmpty(param);
    }

    function value(v) {
        this.isBetweenInclusive = function (min, max) {
            return v >= min && v <= max;
        }
        this.isBetweenExclusive = function (min, max) {
            return v > min && v < max;
        }
    }

    function sameObjects(first, second) {
        var firstType = typeof (first),
            secondType = typeof (second);

        if (first === null && second === null) {
            return true;
        }

        if (firstType !== secondType) {
            return false;
        }

        if (firstType !== 'object' && secondType !== 'object') {
            return first == second;
        }

        var areSame = true;
        for (var prop in first) {
            if (typeof (first[prop]) === 'function') {
                continue;
            }
            areSame = areSame && sameObjects(first[prop], second[prop]);
            if (!areSame) {
                return false;
            }
        }
        return true;
    }

    this.H = this.H || {};
    this.H.Check = this.H.Check || {};
    this.H.Check.notEmpty = notEmpty;
    this.H.Check.condition = condition;
    this.H.Check.isEmpty = isEmpty;
    this.H.Check.isNotEmpty = isNotEmpty;
    this.H.Check.areSame = sameObjects;
    this.H.Check.value = function (val) { return new value(val); }

}).call(this);