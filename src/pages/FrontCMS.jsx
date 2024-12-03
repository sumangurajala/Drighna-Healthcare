import React from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';
import './frontcms.css';

const FrontCMS = () => {
    const pages = [
        { title: 'HOME', url: 'https://healthcare.drighna.com/page/home', type: 'Standard' },
        { title: 'ABOUT US', url: 'https://healthcare.drighna.com/page/about-us', type: 'Standard' },
        { title: 'PRICEING PLAN', url: 'https://healthcare.drighna.com/page/priceing-plan', type: 'Standard' },
        { title: 'CONTACT US', url: 'https://healthcare.drighna.com/page/contact-us', type: 'Standard' },
        { title: 'DrighnaHealthTech', url: 'https://healthcare.drighna.com/page/drighnahealthtech', type: 'Standard' }
    ];

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Page List', 14, 10);
        doc.autoTable({
            head: [['Title', 'URL', 'Page Type']],
            body: pages.map(page => [page.title, page.url, page.type]),
        });
        doc.save('page_list.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: pages,
            properties: ['title', 'url', 'type'],
            type: 'json',
            header: 'Page List'
        });
    };

    const handleCopy = () => {
        const textToCopy = pages.map(page => `${page.title}\t${page.url}\t${page.type}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="container">
            <div>
                <h2>Page List</h2>
                <div className="buttons">
                    <button>Add Page</button>
                    <button>Media Manager</button>
                    <button>Menus</button>
                    <button>Banners</button>
                </div>
            </div>
            <div className="import-buttons">
                <button onClick={exportPDF}>PDF</button>
                <button onClick={handleCopy}>Copy</button>
                <button onClick={handlePrint}>Print</button>
                <CSVLink
                    data={pages}
                    headers={[
                        { label: 'Title', key: 'title' },
                        { label: 'URL', key: 'url' },
                        { label: 'Page Type', key: 'type' },
                    ]}
                    filename="page_list.csv"
                    className="csv-link"
                >
                    <button>CSV</button>
                </CSVLink>
                <button onClick={() => alert('Excel export requires additional libraries.')}>Excel</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Page Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page, index) => (
                        <tr key={index}>
                            <td>{page.title}</td>
                            <td><a href={page.url} target="_blank" rel="noopener noreferrer">{page.url}</a></td>
                            <td><span className="page-type">{page.type}</span></td>
                            <td className="action-buttons">
                                <button onClick={() => alert(`Editing ${page.title}`)}>✏️</button>
                                {page.title === 'DrighnaHealthTech' && (
                                    <button onClick={() => alert(`Deleting ${page.title}`)}>🗑️</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FrontCMS;

