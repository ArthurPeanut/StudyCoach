import SummariesDAO from '../dao/summariesDAO.js';
import { ObjectId } from 'mongodb';
import openai from 'openai';
import { CohereClientV2 } from 'cohere-ai'

export const uploadSummary = async (req, res, next) => {
    try {
        const { documentTitle, documentContent } = req.body;
        const ownerId = req.params.id; // Get the owner ID from the request params

        if (!documentContent || !documentTitle) {
            return next({ status: 400, message: 'Document title and content are required' });
        }

        // Use GPT-like API to summarize the document
        // const summaryResponse = await openai.ChatCompletion.create({
        //     model: 'gpt-4',
        //     messages: [{ role: 'user', content: `Please summarize the following document: ${documentContent}` }],
        // });
        const summaryText = "Ask Openai to provide free apis";

        // const cohere = new CohereClientV2 ({
        //     token: 'Cbp4ugm8PF59EloM3jOZ5pCkRAH5tMQKbhWh1Ion',
        // });

        // Use Cohere API to summarize the document
        // const cohereResponse = await cohere.chat({
        //     model: 'command-r-plus',
        //     messages: [
        //         {
        //             role: 'user',
        //             content: 'hello world!',
        //         },
        //     ],
        // });

        // if (!cohereResponse || !cohereResponse.body || !cohereResponse.body.summary) {
        //     return next({ status: 500, message: 'Failed to summarize the document using Cohere' });
        // }
        
        // const summaryText = cohereResponse.body.summary;
        const date = new Date().toISOString();

        // Save the summary in MongoDB
        const summary = {
            title: documentTitle,
            summary: summaryText,
            owner: new ObjectId(ownerId), // Attach the owner's ID
            createdAt: date,
            updatedAt: date,
        };

        const { insertedId } = await SummariesDAO.insertOne(summary);
        if (!insertedId) {
            return next({ status: 500, message: 'Failed to save summary to database' });
        }

        res.status(200).json({ status: 'success', summary: summaryText });
    } catch (error) {
        next({ status: 500, error });
    }
};

export const searchSummaries = async (req, res, next) => {
    try {
        const query = req.query.q;
        const ownerId = req.params.id; // Get the owner ID from the request params

        if (!query) {
            return next({ status: 400, message: 'Search query is required' });
        }

        const results = await SummariesDAO.searchSummaries(query, ownerId); // Filter by owner ID
        if (!results || results.length === 0) {
            return next({ status: 404, message: 'No summaries found' });
        }

        res.status(200).json({ status: 'success', results });
    } catch (error) {
        next({ status: 500, error });
    }
};
