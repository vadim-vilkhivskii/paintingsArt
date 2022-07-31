const mask = (selector) => {

    let setCursorPos = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let renge = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select()

        }
    }

    function createMask() {
        let matrix = '+38 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),//получаем все не цыфры
            val = this.value.replace(/\D/g, '');//
        if (def.length >= val.length) {
            val = def;
        }
        this.value = matrix.replace(/./g, (a) => {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPos(this.value.length, this);
        }
    }
    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    })

}
export default mask;