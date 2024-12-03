import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface CardData {
    id: number;
    title: string;
    causes: string[];
    culpables: string[];
    solutions: string[];
}

const contentDirectory = path.join(process.cwd(), 'content/cards');

export function getAllCardData(): CardData[] {
    if (!fs.existsSync(contentDirectory)) {
        fs.mkdirSync(contentDirectory, { recursive: true });
    }

    const fileNames = fs.readdirSync(contentDirectory);

    return fileNames.map((fileName) => {
        const filePath = path.join(contentDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        // Debug logging
        console.log('Processing file:', fileName);
        console.log('Raw content:', content);

        // More flexible regex patterns
        const causesMatch = content.match(/###\s*Causas:?\s*([\s\S]*?)(?=###|$)/);
        const culpablesMatch = content.match(/###\s*Culpables:?\s*([\s\S]*?)(?=###|$)/);
        const solutionsMatch = content.match(/###\s*Posibles\s*Soluciones:?\s*([\s\S]*?)(?=###|$)/);

        // Debug logging for matches
        console.log('Causes match:', causesMatch?.[1]);
        console.log('Culpables match:', culpablesMatch?.[1]);
        console.log('Solutions match:', solutionsMatch?.[1]);

        const processList = (match: RegExpMatchArray | null): string[] => {
            if (!match || !match[1]) return [];
            return match[1]
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line.startsWith('-'))
                .map((line) => line.replace(/^-\s*/, ''))
                .filter(Boolean);
        };

        return {
            id: data.id,
            title: data.title,
            causes: processList(causesMatch),
            culpables: processList(culpablesMatch),
            solutions: processList(solutionsMatch)
        };
    });
}

export function getCardById(id: number): CardData | undefined {
    const allCards = getAllCardData();
    return allCards.find((card) => card.id === id);
}
