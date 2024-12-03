
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';
import"./print.css";

const SidebarMenu = () => {
    const menuItems = [
        'OPD Prescription',
        'OPD Bill',
        'IPD Prescription',
        'IPD Bill',
        'Bill',
        'Pharmacy Bill',
        'Payslip',
        'Payment Receipt',
        'Birth Record',
        'Death Record',
        'Pathology',
        'Radiology',
        'Operation',
    ];

    return (
        <div className="sidebar-menu">
            {menuItems.map((item, index) => (
                <button key={index} className="menu-button">
                    {item}
                </button>
            ))}
        </div>
    );
};

const PrintHeaderFooter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const initialContent = [
        {
            header: 'Drighna Healthcare',
            address: 'Kudlu gate Junction, Bangalore',
            phone: '+91 8618793303',
            email: 'contactus@drighna.com',
            website: 'www.healthcare.drighna.com',
        }
    ];

    const [content, setContent] = useState(initialContent);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term !== '') {
            const filtered = initialContent.filter(item =>
                Object.values(item).some(value => value.toString().toLowerCase().includes(term.toLowerCase()))
            );
            setContent(filtered);
        } else {
            setContent(initialContent);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('OPD Prescription Header Footer', 14, 10);
        doc.autoTable({
            head: [['Header', 'Address', 'Phone', 'Email', 'Website']],
            body: content.map(item => [item.header, item.address, item.phone, item.email, item.website]),
        });
        doc.save('opd_prescription.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: content,
            properties: ['header', 'address', 'phone', 'email', 'website'],
            type: 'json',
            header: 'OPD Prescription Header Footer'
        });
    };

    const handleCopy = () => {
        const textToCopy = content.map(item => `${item.header}\t${item.address}\t${item.phone}\t${item.email}\t${item.website}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Content copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="print-header-footer-container">
            <div className="header-section">
                <h2>OPD Prescription Header Footer</h2>
                <div className="header-info">
                    <div className="header-image">
                        <img src="header-image-placeholder.png" alt="Header" />
                    </div>
                    <div className="header-details">
                        <p>Header Image (2230px X 300px)</p>
                    </div>
                </div>
            </div>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="import-buttons">
                    <button className="export-btn" onClick={exportPDF}>PDF</button>
                    <button className="export-btn" onClick={handleCopy}>Copy</button>
                    <button className="export-btn" onClick={handlePrint}>Print</button>
                    <CSVLink
                        data={content}
                        headers={[
                            { label: 'Header', key: 'header' },
                            { label: 'Address', key: 'address' },
                            { label: 'Phone', key: 'phone' },
                            { label: 'Email', key: 'email' },
                            { label: 'Website', key: 'website' }
                        ]}
                        filename="opd_prescription.csv"
                        className="csv-link"
                    >
                        <button className="export-btn">CSV</button>
                    </CSVLink>
                    <button className="export-btn" onClick={() => alert('Excel export requires an additional library (xlsx).')}>Excel</button>
                </div>
            </div>

            <div className="content-section">
                <h3>Footer Content</h3>
                <div className="editor-tools">
                    <button className="tool-btn bold">Bold</button>
                    <button className="tool-btn italic">Italic</button>
                    <button className="tool-btn underline">Underline</button>
                    <button className="tool-btn small">Small</button>
                    <button className="tool-btn quote">“ ”</button>
                    <button className="tool-btn list">• List</button>
                </div>
                <textarea className="footer-content" placeholder="Enter footer content here..."></textarea>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="App">
            <SidebarMenu />
            <PrintHeaderFooter />
        </div>
    );
};

export default App;

