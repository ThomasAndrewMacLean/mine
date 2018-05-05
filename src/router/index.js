import Vue from 'vue';
import Router from 'vue-router';
import Game from './../components/Game';
import Score from './../components/Score';
import Settings from './../components/Settings';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: '/Game',
    },
    {
        path: '/Game',
        name: 'Game',
        component: Game,

    },
    {
        path: '/Scores',
        name: 'Score',
        component: Score,

    },
    {
        path: '/Settings',
        name: 'Settings',
        component: Settings,

    }
    ],
});