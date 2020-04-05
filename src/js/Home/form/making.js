'use strict';

import DOMHelpers from '../../helpers/DOMHelpers';
import backgroundsImages from '../../helpers/background';
import background from './background';
import icons from '../../helpers/icons';
import board from '../board/board';
import store from '../../Store';

const making = () => {
    const { createElement } = DOMHelpers();

    const CLASS = {
        making: '.making',
        makingBody: '.making-body',
        makingFooter: '.making-footer',
        makingBoard: '.making-board',
        makingBoardTitle: '.making-board-title',
        makingBoardClose: '.making-board-close',
        makingBoardSubmit: '.making-board-submit',
    };

    const $making = createElement('form', CLASS.making);
    const $makingBody = createElement('div', CLASS.makingBody);
    const $makingFooter = createElement('div', CLASS.makingFooter);

    const $makingBoard = createElement('div', CLASS.makingBoard);
    $makingBoard.style.backgroundImage = `url('${backgroundsImages.bg1}')`;

    const $input = createElement('input', CLASS.makingBoardTitle);
    $input.type = 'text';
    $input.placeholder = 'Добавить заголовок доски';

    const $button = createElement('button', CLASS.makingBoardClose);
    $button.type = 'button';
    $button.insertAdjacentHTML('afterbegin', icons.close);

    function makingModalCloseHandler() {
        this.closest('[data-modal-close]').remove();
        this.removeEventListener('click', makingModalCloseHandler, false);
    }

    $button.addEventListener('click', makingModalCloseHandler, false);

    $makingBoard.append($input, $button);

    function backgroundHandler(e) {
        if (e.target.dataset.trigger !== undefined) {
            $makingBoard.setAttribute('style', e.target.getAttribute('style'));
        }
    }

    const $background = background();
    $background.addEventListener('click', backgroundHandler, false);

    const $submit = createElement('button', CLASS.makingBoardSubmit);
    $submit.type = 'button';
    $submit.innerHTML = 'Создать доску';

    function submitHandler() {
        const obj = {
            id: Date.now(),
            title: $input.value || 'Название доски',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            background: $makingBoard.getAttribute('style'),
            favorite: false,
            lists: []
        };

        document.querySelector('.adding-board').before(board(obj));

        store.insert(obj);
    }

    $submit.addEventListener('click', submitHandler, false);

    $makingFooter.appendChild($submit);

    $makingBody.append($makingBoard, $background);

    $making.append($makingBody, $makingFooter);

    return $making;
};

export default making;