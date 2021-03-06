
KB.dom = function (tag) {

    function DomManipulation(tag) {
        var element = typeof tag === 'string' ? document.createElement(tag) : tag;

        this.attr = function (attribute, value) {
            if (value !== null) {
                element.setAttribute(attribute, value);
            }
            return this;
        };

        this.hide = function () {
            element.style.display = 'none';
            return this;
        };

        this.show = function () {
            element.style.display = 'block';
            return this;
        };

        this.toggle = function () {
            if (element.style.display === 'none') {
                this.show();
            } else{
                this.hide();
            }

            return this;
        };

        this.click = function (callback) {
            element.onclick = function (e) {
                e.preventDefault();
                callback();
            };
            return this;
        };

        this.add = function (node) {
            element.appendChild(node);
            return this;
        };

        this.html = function (html) {
            element.innerHTML = html;
            return this;
        };

        this.text = function (text) {
            element.appendChild(document.createTextNode(text));
            return this;
        };

        this.addClass = function (className) {
            element.classList.add(className);
            return this;
        };

        this.removeClass = function (className) {
            element.classList.remove(className);
            return this;
        };

        this.toggleClass = function (className) {
            element.classList.toggle(className);
            return this;
        };

        this.hasClass = function (className) {
            return element.classList.contains(className);
        };

        this.parent = function (selector) {
            for (; element && element !== document; element = element.parentNode) {
                if (element.matches(selector)) {
                    return element;
                }
            }

            return null;
        };

        this.child = function (selector) {
            return element.querySelector(selector);
        };

        this.for = function (tag, list) {
            for (var i = 0; i < list.length; i++) {
                var dict = list[i];

                if (typeof dict !== 'object') {
                    element.appendChild(KB.dom(tag).text(dict).build());
                } else {
                    var node = KB.dom(tag);

                    for (var attribute in dict) {
                        if (dict.hasOwnProperty(attribute) && attribute in this && typeof this[attribute] === 'function') {
                            node[attribute](dict[attribute]);
                        } else {
                            node.attr(attribute, dict[attribute]);
                        }
                    }

                    element.appendChild(node.build());
                }
            }

            return this;
        };

        this.build = function () {
            return element;
        };
    }

    return new DomManipulation(tag);
};
