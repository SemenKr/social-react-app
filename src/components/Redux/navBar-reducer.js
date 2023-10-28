"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    navMenu: {
        links: [
            { id: 1, name: 'Profile', path: '/profile' },
            { id: 2, name: 'Messages', path: '/messages/*' },
            { id: 3, name: 'Users', path: '/users' },
            { id: 4, name: 'Music', path: '/music' },
            { id: 5, name: 'Video', path: '/video' },
        ],
        users: [
            { id: 1, name: 'Andrew', src: 'https://i.pravatar.cc/150?img=1', alt: 'Andrew-avatar', },
            { id: 2, name: 'Alex', src: 'https://i.pravatar.cc/150?img=2', alt: 'Alex-avatar', },
            { id: 3, name: 'Nadine', src: 'https://i.pravatar.cc/150?img=3', alt: 'Nadine-avatar', },
            { id: 4, name: 'Tony', src: 'https://i.pravatar.cc/150?img=4', alt: 'Tony-avatar', },
            { id: 5, name: 'Felix', src: 'https://i.pravatar.cc/150?img=5', alt: 'Felix-avatar', },
            { id: 6, name: 'Uliana', src: 'https://i.pravatar.cc/150?img=6', alt: 'Uliana-avatar', },
        ],
    },
};
var navBarReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    return state;
};
exports.default = navBarReducer;
