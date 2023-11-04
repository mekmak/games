import { assert } from 'console'
import { F1Standings, parseHtmlStandings, getStandings  } from '../src/connectors/f1'
import fs from 'fs'

describe('test parsing F1 standings html', () => {
    it('should parse f1 standings', async () => {
        const html = fs.readFileSync('./__tests__/sample_html.txt', 'utf-8')
        const standings = parseHtmlStandings(html)
        const expectedStandings: F1Standings = {
            teams: [
                {name: "Red Bull Racing Honda RBPT", position: 1, points: 731},
                {name: "Mercedes", position: 2, points: 371},
                {name: "Ferrari", position: 3, points: 349},
                {name: "McLaren Mercedes", position: 4, points: 256},
                {name: "Aston Martin Aramco Mercedes", position: 5, points: 236},
                {name: "Alpine Renault", position: 6, points: 101},
                {name: "Williams Mercedes", position: 7, points: 28},
                {name: "AlphaTauri Honda RBPT", position: 8, points: 16},
                {name: "Alfa Romeo Ferrari", position: 9, points: 16},
                {name: "Haas Ferrari", position: 10, points: 12}
            ]
        }

        expect(standings).toEqual(expectedStandings)
    })
})