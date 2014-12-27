/*
 * https://github.com/madflow/jquery-slugify
 *
 * Copyright (c) 2013 Florian Reiss
 * Licensed under the MIT license.
 */

;(function($) {

    $.fn.slugify = function(source, options) {
        return this.each(function() {
            var $target = $(this),
                $source = $(source);

            $target.on('keyup change', function() {
                if ($target.val() !== '' && $target.val() !== undefined) {
                    $target.data('locked', true);
                } else {
                    $target.data('locked', false);
                }
            });

            $source.on('keyup change', function() {
                if (true === $target.data('locked')) {
                    return;
                }
                if ($target.is('input') || $target.is('textarea')) {
                    $target.val($.slugify($source.val(), options));
                } else {
                    $target.text($.slugify($source.val(), options));
                }
            });
        });
    };

    // Static method.
    $.slugify = function(sourceString, options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.slugify.options, options);

        // Apply preSlug function - if exists
        if (typeof options.preSlug === 'function') {
            sourceString = options.preSlug(sourceString);
        }

        sourceString = $.trim(sourceString); // Trim
        sourceString = sourceString.toLowerCase(); // Lower Case
        $.each(options.replaceMap, function(key, value) { // Special char map
            sourceString = sourceString.replace(new RegExp(key, 'g'), value || options.invalid);
        });

        sourceString = sourceString
            .replace(/\s+/g, options.whitespace) // Replace whitespace characters
            .replace(new RegExp('[^a-z0-9 ' + options.whitespace + ']', 'g'), options.invalid); // Replace invalid characters

        // Apply postSlug function - if exists
        if (typeof options.postSlug === 'function') {
            sourceString = options.postSlug(sourceString);
        }

        return sourceString;
    };

    // Default options
    $.slugify.options = {
        whitespace: '-',
        invalid: '',
        preSlug: null,
        postSlug: null,
        replaceMap: {
            'á': 'a',
            'à': 'a',
            'â': 'a',
            'ä': 'ae',
            'ã': 'a',
            'æ': 'ae',
            'ç': 'c',
            'é': 'e',
            'è': 'e',
            'ê': 'e',
            'ë': 'e',
            'ẽ': 'e',
            'í': 'i',
            'ì': 'i',
            'î': 'i',
            'ï': 'i',
            'ĩ': 'i',
            'ó': 'o',
            'ò': 'o',
            'ô': 'o',
            'ö': 'oe',
            'õ': 'o',
            'œ': 'oe',
            'ß': 'ss',
            'ú': 'u',
            'ù': 'u',
            'û': 'u',
            'ü': 'ue',
            'ũ': 'u',
            'ă': 'a',
            'ắ': 'a',
            'ằ': 'a',
            'ẵ': 'a',
            'ẳ': 'a',
            'ấ': 'a',
            'ầ': 'a',
            'ẫ': 'a',
            'ẩ': 'a',
            'ǎ': 'a',
            'å': 'a',
            'ǻ': 'a',
            'ǟ': 'a',
            'ȧ': 'a',
            'ǡ': 'a',
            'ą': 'a',
            'ā': 'a',
            'ả': 'a',
            'ȁ': 'a',
            'ȃ': 'a',
            'ạ': 'a',
            'ặ': 'a',
            'ậ': 'a',
            'ḁ': 'a',
            'ⱥ': 'a',
            'ᶏ': 'a',
            'ɐ': 'a',
            'ɑ': 'a',
            'ḃ': 'b',
            'ḅ': 'b',
            'ḇ': 'b',
            'ƀ': 'b',
            'ɓ': 'b',
            'ƃ': 'b',
            'ᵬ': 'b',
            'ᶀ': 'b',
            'þ': 'b',
            'ć': 'c',
            'ĉ': 'c',
            'č': 'c',
            'ċ': 'c',
            'ḉ': 'c',
            'ȼ': 'c',
            'ƈ': 'c',
            'ɕ': 'c',
            'ď': 'd',
            'ḋ': 'd',
            'ḑ': 'd',
            'ḍ': 'd',
            'ḓ': 'd',
            'ḏ': 'd',
            'đ': 'd',
            'ɖ': 'd',
            'ɗ': 'd',
            'ƌ': 'd',
            'ᵭ': 'd',
            'ᶁ': 'd',
            'ᶑ': 'd',
            'ȡ': 'd',
            '∂': 'd',
            'ĕ': 'e',
            'ế': 'e',
            'ề': 'e',
            'ễ': 'e',
            'ể': 'e',
            'ě': 'e',
            'ė': 'e',
            'ȩ': 'e',
            'ḝ': 'e',
            'ę': 'e',
            'ē': 'e',
            'ḗ': 'e',
            'ḕ': 'e',
            'ẻ': 'e',
            'ȅ': 'e',
            'ȇ': 'e',
            'ẹ': 'e',
            'ệ': 'e',
            'ḙ': 'e',
            'ḛ': 'e',
            'ɇ': 'e',
            'ᶒ': 'e',
            'ḟ': 'f',
            'ƒ': 'f',
            'ᵮ': 'f',
            'ᶂ': 'f',
            'ǵ': 'g',
            'ğ': 'g',
            'ĝ': 'g',
            'ǧ': 'g',
            'ġ': 'g',
            'ģ': 'g',
            'ḡ': 'g',
            'ǥ': 'g',
            'ɠ': 'g',
            'ᶃ': 'g',
            'ĥ': 'h',
            'ȟ': 'h',
            'ḧ': 'h',
            'ḣ': 'h',
            'ḩ': 'h',
            'ḥ': 'h',
            'ḫ': 'h',
            'ẖ': 'h',
            'ħ': 'h',
            'ⱨ': 'h',
            'ĭ': 'i',
            'ǐ': 'i',
            'ḯ': 'i',
            'į': 'i',
            'ī': 'i',
            'ỉ': 'i',
            'ȉ': 'i',
            'ȋ': 'i',
            'ị': 'i',
            'ḭ': 'i',
            'ɨ': 'i',
            'ᵻ': 'i',
            'ᶖ': 'i',
            'i': 'i',
            'ı': 'i',
            'ĵ': 'j',
            'ɉ': 'j',
            'ǰ': 'j',
            'ȷ': 'j',
            'ʝ': 'j',
            'ɟ': 'j',
            'ʄ': 'j',
            'ḱ': 'k',
            'ǩ': 'k',
            'ķ': 'k',
            'ḳ': 'k',
            'ḵ': 'k',
            'ƙ': 'k',
            'ⱪ': 'k',
            'ᶄ': 'k',
            'ĺ': 'l',
            'ľ': 'l',
            'ļ': 'l',
            'ḷ': 'l',
            'ḹ': 'l',
            'ḽ': 'l',
            'ḻ': 'l',
            'ł': 'l',
            'ŀ': 'l',
            'ƚ': 'l',
            'ⱡ': 'l',
            'ɫ': 'l',
            'ɬ': 'l',
            'ᶅ': 'l',
            'ɭ': 'l',
            'ȴ': 'l',
            'ḿ': 'm',
            'ṁ': 'm',
            'ṃ': 'm',
            'ᵯ': 'm',
            'ᶆ': 'm',
            'ɱ': 'm',
            'ń': 'n',
            'ǹ': 'n',
            'ň': 'n',
            'ñ': 'n',
            'ṅ': 'n',
            'ņ': 'n',
            'ṇ': 'n',
            'ṋ': 'n',
            'ṉ': 'n',
            'n̈': 'n',
            'ɲ': 'n',
            'ƞ': 'n',
            'ŋ': 'n',
            'ᵰ': 'n',
            'ᶇ': 'n',
            'ɳ': 'n',
            'ȵ': 'n',
            'ŏ': 'o',
            'ố': 'o',
            'ồ': 'o',
            'ỗ': 'o',
            'ổ': 'o',
            'ǒ': 'o',
            'ȫ': 'o',
            'ő': 'o',
            'ṍ': 'o',
            'ṏ': 'o',
            'ȭ': 'o',
            'ȯ': 'o',
            '͘o͘': 'o',
            'ȱ': 'o',
            'ø': 'o',
            'ǿ': 'o',
            'ǫ': 'o',
            'ǭ': 'o',
            'ō': 'o',
            'ṓ': 'o',
            'ṑ': 'o',
            'ỏ': 'o',
            'ȍ': 'o',
            'ȏ': 'o',
            'ơ': 'o',
            'ớ': 'o',
            'ờ': 'o',
            'ỡ': 'o',
            'ở': 'o',
            'ợ': 'o',
            'ọ': 'o',
            'ộ': 'o',
            'ɵ': 'o',
            'ɔ': 'o',
            'ṕ': 'p',
            'ṗ': 'p',
            'ᵽ': 'p',
            'ƥ': 'p',
            'p̃': 'p',
            'ᵱ': 'p',
            'ᶈ': 'p',
            'ɋ': 'q',
            'ƣ': 'q',
            'ʠ': 'q',
            'ŕ': 'r',
            'ř': 'r',
            'ṙ': 'r',
            'ŗ': 'r',
            'ȑ': 'r',
            'ȓ': 'r',
            'ṛ': 'r',
            'ṝ': 'r',
            'ṟ': 'r',
            'ɍ': 'r',
            'ɽ': 'r',
            'ᵲ': 'r',
            'ᶉ': 'r',
            'ɼ': 'r',
            'ɾ': 'r',
            'ᵳ': 'r',
            'ś': 's',
            'ṥ': 's',
            'ŝ': 's',
            'š': 's',
            'ṧ': 's',
            'ṡẛ': 's',
            'ş': 's',
            'ṣ': 's',
            'ṩ': 's',
            'ș': 's',
            's̩': 's',
            'ᵴ': 's',
            'ᶊ': 's',
            'ʂ': 's',
            'ȿ': 's',
            'ť': 't',
            'ṫ': 't',
            'ţ': 't',
            'ṭ': 't',
            'ț': 't',
            'ṱ': 't',
            'ṯ': 't',
            'ŧ': 't',
            'ⱦ': 't',
            'ƭ': 't',
            'ʈ': 't',
            '̈ẗ': 't',
            'ᵵ': 't',
            'ƫ': 't',
            'ȶ': 't',
            'ŭ': 'u',
            'ǔ': 'u',
            'ů': 'u',
            'ǘ': 'u',
            'ǜ': 'u',
            'ǚ': 'u',
            'ǖ': 'u',
            'ű': 'u',
            'ṹ': 'u',
            'ų': 'u',
            'ū': 'u',
            'ṻ': 'u',
            'ủ': 'u',
            'ȕ': 'u',
            'ȗ': 'u',
            'ư': 'u',
            'ứ': 'u',
            'ừ': 'u',
            'ữ': 'u',
            'ử': 'u',
            'ự': 'u',
            'ụ': 'u',
            'ṳ': 'u',
            'ṷ': 'u',
            'ṵ': 'u',
            'ʉ': 'u',
            'ᵾ': 'u',
            'ᶙ': 'u',
            'ṽ': 'v',
            'ṿ': 'v',
            'ʋ': 'v',
            'ᶌ': 'v',
            'ⱴ': 'v',
            'ẃ': 'w',
            'ẁ': 'w',
            'ŵ': 'w',
            'ẅ': 'w',
            'ẇ': 'w',
            'ẉ': 'w',
            'ẘ': 'w',
            'ẍ': 'x',
            'ẋ': 'x',
            'ᶍ': 'x',
            'ý': 'y',
            'ỳ': 'y',
            'ŷ': 'y',
            'ẙ': 'y',
            'ÿ': 'y',
            'ỹ': 'y',
            'ẏ': 'y',
            'ȳ': 'y',
            'ỷ': 'y',
            'ỵ': 'y',
            'ɏ': 'y',
            'ƴ': 'y',
            'ʏ': 'y',
            'ź': 'z',
            'ẑ': 'z',
            'ž': 'z',
            'ż': 'z',
            'ẓ': 'z',
            'ẕ': 'z',
            'ƶ': 'z',
            'ȥ': 'z',
            'ⱬ': 'z',
            'ᵶ': 'z',
            'ᶎ': 'z',
            'ʐ': 'z',
            'ʑ': 'z',
            'ɀ': 'z',
            'α': 'a',
            'β': 'b',
            'γ': 'g',
            'ɣ': 'g',
            'δ': 'd',
            'ð': 'd',
            'ε': 'e',
            'ζ': 'z',
            'η': 'i',
            'θ': 'th',
            'ι': 'i',
            'κ': 'k',
            'λ': 'l',
            'μ': 'm',
            'µ': 'm',
            'ν': 'n',
            'ξ': 'x',
            'ο': 'o',
            'π': 'p',
            'ρ': 'r',
            'σ': 's',
            'ς': 's',
            'τ': 't',
            'υ': 'u',
            'φ': 'f',
            'χ': 'ch',
            'ψ': 'ps',
            'ω': 'o',
            'ᾳ': 'a',
            'ά': 'a',
            'ὰ': 'a',
            'ᾴ': 'a',
            'ᾲ': 'a',
            'ᾶ': 'a',
            'ᾷ': 'a',
            'ἀ': 'a',
            'ᾀ': 'a',
            'ἄ': 'a',
            'ᾄ': 'a',
            'ἂ': 'a',
            'ᾂ': 'a',
            'ἆ': 'a',
            'ᾆ': 'a',
            'ἁ': 'a',
            'ᾁ': 'a',
            'ἅ': 'a',
            'ᾅ': 'a',
            'ἃ': 'a',
            'ᾃ': 'a',
            'ἇ': 'a',
            'ᾇ': 'a',
            'ᾱ': 'a',
            'ᾰ': 'a',
            'έ': 'e',
            'ὲ': 'e',
            'ἐ': 'e',
            'ἔ': 'e',
            'ἒ': 'e',
            'ἑ': 'e',
            'ἕ': 'e',
            'ἓ': 'e',
            'ῃ': 'i',
            'ή': 'i',
            'ὴ': 'i',
            'ῄ': 'i',
            'ῂ': 'i',
            'ῆ': 'i',
            'ῇ': 'i',
            'ἠ': 'i',
            'ᾐ': 'i',
            'ἤ': 'i',
            'ᾔ': 'i',
            'ἢ': 'i',
            'ᾒ': 'i',
            'ἦ': 'i',
            'ᾖ': 'i',
            'ἡ': 'i',
            'ᾑ': 'i',
            'ἥ': 'i',
            'ᾕ': 'i',
            'ἣ': 'i',
            'ᾓ': 'i',
            'ἧ': 'i',
            'ᾗ': 'i',
            'ί': 'i',
            'ὶ': 'i',
            'ῖ': 'i',
            'ἰ': 'i',
            'ἴ': 'i',
            'ἲ': 'i',
            'ἶ': 'i',
            'ἱ': 'i',
            'ἵ': 'i',
            'ἳ': 'i',
            'ἷ': 'i',
            'ϊ': 'i',
            'ΐ': 'i',
            'ῒ': 'i',
            'ῗ': 'i',
            'ῑ': 'i',
            'ῐ': 'i',
            'ό': 'o',
            'ὸ': 'o',
            'ὀ': 'o',
            'ὄ': 'o',
            'ὂ': 'o',
            'ὁ': 'o',
            'ὅ': 'o',
            'ὃ': 'o',
            'ύ': 'u',
            'ὺ': 'u',
            'ῦ': 'u',
            'ὐ': 'u',
            'ὔ': 'u',
            'ὒ': 'u',
            'ὖ': 'u',
            'ὑ': 'u',
            'ὕ': 'u',
            'ὓ': 'u',
            'ὗ': 'u',
            'ϋ': 'u',
            'ΰ': 'u',
            'ῢ': 'u',
            'ῧ': 'u',
            'ῡ': 'u',
            'ῠ': 'u',
            'ῳ': 'o',
            'ώ': 'o',
            'ῴ': 'o',
            'ὼ': 'o',
            'ῲ': 'o',
            'ῶ': 'o',
            'ῷ': 'o',
            'ὠ': 'o',
            'ᾠ': 'o',
            'ὤ': 'o',
            'ᾤ': 'o',
            'ὢ': 'o',
            'ᾢ': 'o',
            'ὦ': 'o',
            'ᾦ': 'o',
            'ὡ': 'o',
            'ᾡ': 'o',
            'ὥ': 'o',
            'ᾥ': 'o',
            'ὣ': 'o',
            'ᾣ': 'o',
            'ὧ': 'o',
            'ᾧ': 'o',
            'ῤ': 'r',
            'ῥ': 'r',
            'а': 'a',
            'б': 'b',
            'в': 'v',
            'г': 'g',
            'д': 'd',
            'е': 'e',
            'ё': 'e',
            'ж': 'zh',
            'з': 'z',
            'и': 'i',
            'й': 'j',
            'к': 'k',
            'л': 'l',
            'м': 'm',
            'н': 'n',
            'о': 'o',
            'п': 'p',
            'р': 'r',
            'с': 's',
            'т': 't',
            'у': 'u',
            'ф': 'f',
            'х': 'h',
            'ц': 'ts',
            'ч': 'ch',
            'ш': 'sh',
            'щ': 'sh',
            'ы': 'i',
            ' ': '',
            'э': 'e',
            'ю': 'yu',
            'я': 'ya',
            'і': 'j',
            'ѳ': 'f',
            'ѣ': 'e',
            'ѵ': 'i',
            'ѕ': 'z',
            'ѯ': 'ks',
            'ѱ': 'ps',
            'ѡ': 'o',
            'ѫ': 'yu',
            'ѧ': 'ya',
            'ѭ': 'yu',
            'ѩ': 'ya'
        }
    };

}(jQuery));