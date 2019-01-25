import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger
} from '@angular/animations';

export const animations = [
    trigger('collapse', [
        state('open', style({
            height: '*'
        })),
        state('closed', style({
            height: '0',
            display: 'none'
        })),
        transition('open => closed', [
            animate('.2s')
        ]),
        transition('closed => open', [
            animate('.2s')
        ]),
    ]),

    trigger('slide', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(150, style({ opacity: 1 }))
        ]),
        transition(':leave', [
            animate(200, style({
                transform: 'translateX(100%)',
                opacity: 0
            })),
        ]),
    ])
];