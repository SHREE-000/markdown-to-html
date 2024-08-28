import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');
    const [debouncedMarkdown, setDebouncedMarkdown] = useState(markdown);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedMarkdown(markdown);
        }, 600);

        return () => {
            clearTimeout(timer);
        };
    }, [markdown]);

    useEffect(() => {
        const convertMarkdownToHtml = async () => {
            try {
                const response = await axios.post('http://localhost:5000/convert', { markdown: debouncedMarkdown });
                setHtml(response.data.html);
            } catch (error) {
                console.error("Error converting markdown to HTML:", error);
            }
        };

        if (debouncedMarkdown) {
            convertMarkdownToHtml();
        } else {
            setHtml('');
        }
    }, [debouncedMarkdown]);

    return (
        <div className="editor-container">
            <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Enter Markdown here"
            />
            <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default MarkdownEditor;
