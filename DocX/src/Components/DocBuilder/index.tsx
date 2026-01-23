import { useCallback, useState } from 'react';
import * as docx from 'docx';
import type { DocStructure, SelectedText } from '../../types';
import Section from '../Section';


const DocBuilder = () => {

  const [docStructure, setDocStructure] = useState<DocStructure>({
    sections: [
      {
        children: [
          {
            children: [
              { text: "Hola Mundo", bold: false, italics: false, underline: false, size: 24, color: "000000" }
            ],
            alignment: 'left'
          }
        ]
      }
    ]
  });

  const [selectedText, setSelectedText] = useState<SelectedText | null>(null);

  const handleOnClickBuildDoc = useCallback(() => {
    const doc = new docx.Document({
      sections: docStructure.sections.map(sectionData => (
        {
          properties: {},
          children: sectionData.children.map(paragraphData => new docx.Paragraph({
            alignment: paragraphData.alignment === 'left' ? docx.AlignmentType.LEFT :
              paragraphData.alignment === 'center' ? docx.AlignmentType.CENTER :
                paragraphData.alignment === 'right' ? docx.AlignmentType.RIGHT :
                  docx.AlignmentType.JUSTIFIED,
            children: paragraphData.children.map(textData => new docx.TextRun({
              text: textData.text,
              bold: textData.bold,
              italics: textData.italics,
              underline: textData.underline ? {} : undefined,
              size: textData.size,
              color: textData.color,
            })),
          }))
        }
      ))
    });

    docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documento.docx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }, [docStructure]);

  const addSection = () => {
    const newStructure = { ...docStructure };
    newStructure.sections.push({
      children: [
        {
          children: [{ text: "Nuevo párrafo", bold: false, italics: false, underline: false, size: 24, color: "000000" }],
          alignment: 'left'
        }
      ]
    });
    setDocStructure(newStructure);
  };

  const removeSection = (sectionIndex: number) => {
    if (docStructure.sections.length > 1) {
      const newStructure = { ...docStructure };
      newStructure.sections.splice(sectionIndex, 1);
      setDocStructure(newStructure);
    }
  };

  return (
    <div className="doc-builder">
      <div className="header">
        <h1>📄 Constructor de Documentos Word</h1>
        <button className="btn btn-secondary" onClick={handleOnClickBuildDoc}>
          <span>💾</span> Descargar Documento
        </button>
      </div>

      <div className="sections-container">
        {
          docStructure.sections.map((sectionData, sectionIndex) => (
            <Section key={sectionIndex} sectionIndex={sectionIndex} docStructure={docStructure} sectionData={sectionData} selectedText={selectedText} setDocStructure={setDocStructure} removeSection={removeSection} setSelectedText={setSelectedText} />
          ))
        }
      </div>

      <div className="footer">
        <button className="btn btn-secondary" onClick={addSection}>
          ➕ Añadir Página
        </button>
      </div>
    </div>
  );
};

export default DocBuilder;