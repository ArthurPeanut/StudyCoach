import { db } from '../libs/dbConnect.js';

const collection = db.collection('summaries');

class SummariesDAO {
    static async insertOne(summary) {
        try {
            const result = await collection.insertOne(summary);
            return result;
        } catch (error) {
            console.error(`Failed to insert summary: ${error.message}`);
            throw error;
        }
    }

    static async searchSummaries(query, ownerId) {
        try {
            const results = await collection.find({
                summary: { $regex: query, $options: 'i' }, // Case-insensitive search
                owner: ownerId, // Filter by owner ID
            }).toArray();
            return results;
        } catch (error) {
            console.error(`Failed to search summaries: ${error.message}`);
            throw error;
        }
    }

    // Optional: Use advanced Atlas Search if available
    static async searchSummariesWithAtlas(query, ownerId) {
        try {
            const results = await collection
                .aggregate([
                    {
                        $search: {
                            index: "default", // Ensure a search index is created in MongoDB
                            text: {
                                query: query,
                                path: ["title", "summary"], // Fields to search
                            },
                        },
                    },
                    {
                        $match: {
                            owner: ownerId, // Filter by owner ID
                        },
                    },
                    {
                        $project: {
                            title: 1,
                            summary: 1,
                            score: { $meta: "searchScore" }, // Include relevance score
                        },
                    },
                    { $sort: { score: -1 } }, // Sort by relevance score
                    { $limit: 10 }, // Limit the number of results
                ])
                .toArray();

            return results;
        } catch (error) {
            console.error(`Failed to search summaries with Atlas Search: ${error.message}`);
            throw error;
        }
    }
}

export default SummariesDAO;
