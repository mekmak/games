import axios from "axios"
import { parse, HTMLElement } from 'node-html-parser'

export interface F1Standings {
    teams: F1Team[]
}

export interface F1Team {
    name: string
    position: number
    points: number    
}

const teamShortNames: Map<string, string> = new Map([
    ["Red Bull Racing Honda RBPT", "Red Bull"],
    ["Ferrari", "Ferrari"],
    ["Mercedes", "Mercedes"],
    ["McLaren Mercedes", "McLaren"],
    ["Alfa Romeo Ferrari", "Alfa Romeo"],
    ["Alpine Renault", "Alpine"],
    ["AlphaTauri Honda RBPT", "AlphaTauri"],
    ["Haas Ferrari", "Haas"],
    ["Aston Martin Aramco Mercedes", "Aston Martin"],
    ["Williams Mercedes", "Williams"]
])

export function parseHtmlStandings(html: string): F1Standings {
    function tryParseTeam(row: HTMLElement): F1Team | undefined {
        try {
            return parseTeam(row)
        } catch (e) {
            console.error(`Could not parse team: ${row}, error: ${e}`)
            return undefined
        }
    }

    function parseTeam(row: HTMLElement): F1Team {
        const cells = row.querySelectorAll("td")
        const name = cells[2].querySelector("a")?.innerText ?? "Unknown"
        return {
            name: name,
            points: Number(cells[3].innerText),
            position: Number(cells[1].innerText)
        }
    }

    const rows = parse(html)
        .querySelector(".resultsarchive-table")
        ?.querySelector("tbody")
        ?.querySelectorAll("tr") ?? []

    const teams: F1Team[] = []
    for(const row of rows) {
        const team = tryParseTeam(row)
        if(team) {
            teams.push(team)
        }
    }

    return {
        teams: teams
    }
}

export async function getStandings(): Promise<F1Standings | undefined> {
    try {
        const resp = await axios.get<string>("http://www.formula1.com/en/results/jcr:content/resultsarchive.html/2023/team.html")
        const standings = parseHtmlStandings(resp.data)
        return standings

    } catch (e) {
        console.log(`Unable to fetch F1 standings: ${e}`)
        return undefined
    }
}