var fs = require('fs');
var css = require('css');

var targetSize = process.argv[3] || null;


if (process.argv[2]) {
    var contents = fs.readFileSync(process.argv[2], 'utf8');
    var stylesheet = css.parse(contents);

    stylesheet.stylesheet.rules = stylesheet.stylesheet.rules.filter(removeNonVWRules);

    console.log(css.stringify(stylesheet));
} else {
    console.log('Please provide a path to the css file')
}

function removeNonVWRules(rule) {
    if (rule.type === 'rule') {
        rule.declarations = rule.declarations.filter(removeNonVWDeclarations);
        return rule.declarations.length > 0;
    } else if (rule.type === 'media') {
        rule.rules = rule.rules.filter(removeNonVWRules);
        return true;
    }
}

function removeNonVWDeclarations(declaration) {
    if (declaration.value && declaration.value.includes('vw')) {

        if (targetSize) {
            declaration.value = convertToSize(targetSize, declaration.value);
        }

        return true;
    }
}

function convertToSize(baseSize, value) {
    var valsArray = value.split(' ');

    for (var i in valsArray) {
        var val = valsArray[i];

        if (val.includes('vw')) {
            var int = parseFloat(val);

            valsArray[i] =  parseInt(int * baseSize / 100) + 'px';
        }
    }

    return valsArray.join(' ');
}
