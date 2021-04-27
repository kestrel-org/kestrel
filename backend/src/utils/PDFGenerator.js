const PDFDocument = require('pdfkit');
const fs = require('fs');

const tempFileName = 'output.pdf';

const colors = {
    primary: '#004e6d',
    secondary: '#841125',
    default: 'black'
}
class PDFGenerator {
    createDocument() {
        this.doc = new PDFDocument(tempFileName);
        this.doc.pipe(fs.createWriteStream(tempFileName));
        return this;
    }

    writeTitle(title) {
        this.doc.font('Helvetica-Bold').fillColor(colors.primary);
        this.doc.fontSize(24);
        this.doc.text(title, {
            align: 'center'
        });
        this.doc.font('Helvetica').fillColor(colors.default);
        this.doc.fontSize(12);
        return this;
    }

    moveDown(line = 1) {
        this.doc.moveDown(line);
    }

    writeSubtitle(subtitle) {
        this.doc.moveDown(2);
        this.doc.font('Helvetica-Bold').fillColor(colors.primary);
        this.doc.fontSize(16);
        this.doc.text(subtitle);
        this.doc.font('Helvetica').fillColor(colors.default);
        this.doc.fontSize(12);
        this.doc.moveDown(1);
        return this;
    }


    writeLabelValuePair(label, value, offset) {
        this.doc.font('Helvetica-Bold').fillColor(colors.secondary);
        this.doc.text(`${label} : `);
        this.doc.font('Helvetica').fillColor(colors.default);
        this.doc.x = offset;
        this.doc.y -= this.doc.heightOfString(label);
        this.doc.text(value);
        this.doc.x = 72;
        this.doc.y += this.doc.heightOfString(label);
        return this;
    }

    closeAndGetBytes() {
        return new Promise((resolve, reject) => {
            try {
                this.doc.end();
                setTimeout(() => {
                    resolve(fs.readFileSync(tempFileName))
                }, 250);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = PDFGenerator;