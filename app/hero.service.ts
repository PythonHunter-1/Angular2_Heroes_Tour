import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable() 
export class HeroService {
	private heroesUrl = 'api/heroes';

	constructor(private http: Http) {}

	getHeroes(): Promise<Hero[]> {
		// return Promise.resolve(HEROES);
		return this.http.get(this.heroesUrl)
					.toPromise()
					.then(response => response.json().data as Hero[])
					.catch(this.handleError);
	}	

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}

	getHeroesSlowly(): Promise<Hero[]> {
		return new Promise(resolve => {
			setTimeout(() => resolve(this.getHeroes()), 2000);
		})
	}
	getHero(id: number): Promise<Hero> {
		return this.getHeroes()
				.then(heroes => heroes.find(hero => hero.id === id));
	}
}