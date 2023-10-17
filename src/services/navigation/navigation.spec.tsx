import { mockMenuItems } from '@/constants/tests';
import NavigationService from './navigation';
import '@testing-library/jest-dom';

describe('NavigationService', () => {

    const navigationService = new NavigationService(mockMenuItems);

    describe('parseMenu', () => {

        it('When given empty body of menu items, return empty array', () => {
            const test = navigationService.parseLinks([]);
            expect(test).toHaveLength(0);
        });

        it('When given list of one or more menu items, parse them to have the correct interface', () => {
            const test = navigationService.parseLinks(mockMenuItems);
            console.log('test: ', test);

            expect(test).toStrictEqual([ { text: 'Test Page', href: '/test-page' } ]);
        });

    });

})