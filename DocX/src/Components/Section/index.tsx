import React, { useState } from 'react';
import { DocStructure, SectionData, SelectedText, TextRunData } from '../../types';

type SectionPropsType = {
  sectionIndex: number;
  docStructure: DocStructure;
  sectionData: SectionData;
  setDocStructure: React.Dispatch<React.SetStateAction<DocStructure>>;
  removeSection: (sectionIndex: number) => void;
}


const Section: React.FC<SectionPropsType> = ({ sectionIndex, docStructure, sectionData, setDocStructure, removeSection }) => {

  const [selectedText, setSelectedText] = useState<SelectedText | null>(null);

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>, paragraphIndex: number, textIndex: number) => {
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
    const newStructure = { ...docStructure };
    newStructure.sections[sectionIndex].children[paragraphIndex].children[textIndex].text = target.value;
    setDocStructure(newStructure);
  };

  const addTextRun = (paragraphIndex: number) => {
    const newStructure = { ...docStructure };
    newStructure.sections[sectionIndex].children[paragraphIndex].children.push({
      text: "Nuevo texto",
      bold: false,
      italics: false,
      underline: false,
      size: 24,
      color: "000000"
    });
    setDocStructure(newStructure);
  };

  const removeTextRun = (paragraphIndex: number, textIndex: number) => {
    const newStructure = { ...docStructure };
    if (newStructure.sections[sectionIndex].children[paragraphIndex].children.length > 1) {
      newStructure.sections[sectionIndex].children[paragraphIndex].children.splice(textIndex, 1);
      setDocStructure(newStructure);
    }
  };

  const addParagraph = () => {
    const newStructure = { ...docStructure };
    newStructure.sections[sectionIndex].children.push({
      children: [{ text: "Nuevo párrafo", bold: false, italics: false, underline: false, size: 24, color: "000000" }],
      alignment: 'left'
    });
    setDocStructure(newStructure);
  };

  const removeParagraph = (paragraphIndex: number) => {
    const newStructure = { ...docStructure };
    if (newStructure.sections[sectionIndex].children.length > 1) {
      newStructure.sections[sectionIndex].children.splice(paragraphIndex, 1);
      setDocStructure(newStructure);
    }
  };

  const handleAlignmentChange = (paragraphIndex: number, alignment: 'left' | 'center' | 'right' | 'justified') => {
    const newStructure = { ...docStructure };
    newStructure.sections[sectionIndex].children[paragraphIndex].alignment = alignment;
    setDocStructure(newStructure);
  };

  const handleFormatChange = (
    paragraphIndex: number,
    textIndex: number,
    format: keyof TextRunData,
    value: boolean | number | string
  ) => {
    const newStructure = { ...docStructure };
    (newStructure.sections[sectionIndex].children[paragraphIndex].children[textIndex][format] as unknown) = value;
    setDocStructure(newStructure);
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>📑 Página {sectionIndex + 1}</h2>
        <div className="section-actions">
          <button className="btn btn-small" onClick={addParagraph}>
            ➕ Añadir Párrafo
          </button>
          {docStructure.sections.length > 1 && (
            <button className="btn btn-danger btn-small" onClick={() => removeSection(sectionIndex)}>
              🗑️ Eliminar página
            </button>
          )}
        </div>
      </div>

      <div className="paragraphs-container">
        {
          sectionData.children.map((paragraphData, paragraphIndex) => (
            <div key={paragraphIndex} className="paragraph-card">
              <div className="paragraph-header">
                <h3>📝 Párrafo {paragraphIndex + 1}</h3>
                <div className="alignment-controls">
                  <label>Alineación:</label>
                  <select
                    value={paragraphData.alignment || 'left'}
                    onChange={(e) => handleAlignmentChange(paragraphIndex, e.target.value as 'left' | 'center' | 'right' | 'justified')}
                    className="select-input"
                  >
                    <option value="left">Izquierda</option>
                    <option value="center">Centro</option>
                    <option value="right">Derecha</option>
                    <option value="justified">Justificado</option>
                  </select>
                </div>
                {sectionData.children.length > 1 && (
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => removeParagraph(paragraphIndex)}
                  >
                    🗑️
                  </button>
                )}
              </div>

              <div className="text-runs-container">
                {paragraphData.children.map((textData, textIndex) => {
                  const isSelected = selectedText?.sectionIndex === sectionIndex &&
                    selectedText?.paragraphIndex === paragraphIndex &&
                    selectedText?.textIndex === textIndex;

                  return (
                    <div key={textIndex} className={`text-run-card ${isSelected ? 'selected' : ''}`}>
                      <div className="text-run-header">
                        <span className="text-run-label">Texto {textIndex + 1}</span>
                        {paragraphData.children.length > 1 && (
                          <button
                            className="btn btn-danger btn-tiny"
                            onClick={() => removeTextRun(paragraphIndex, textIndex)}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <textarea
                        className="text-input"
                        value={textData.text}
                        onChange={(e) => handleTextAreaInput(e, paragraphIndex, textIndex)}
                        onFocus={(e) => {
                          setSelectedText({ sectionIndex, paragraphIndex, textIndex });
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        rows={1}
                      />

                      <div className="format-controls">
                        <div className="format-row">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={textData.bold || false}
                              onChange={(e) => handleFormatChange(paragraphIndex, textIndex, 'bold', e.target.checked)}
                            />
                            <span className="bold-text">Negrita</span>
                          </label>

                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={textData.italics || false}
                              onChange={(e) => handleFormatChange(paragraphIndex, textIndex, 'italics', e.target.checked)}
                            />
                            <span className="italic-text">Cursiva</span>
                          </label>

                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={textData.underline || false}
                              onChange={(e) => handleFormatChange(paragraphIndex, textIndex, 'underline', e.target.checked)}
                            />
                            <span className="underline-text">Subrayado</span>
                          </label>
                        </div>

                        <div className="format-row">
                          <label className="input-label">
                            Tamaño:
                            <input
                              type="number"
                              className="number-input"
                              value={textData.size || 24}
                              onChange={(e) => handleFormatChange(paragraphIndex, textIndex, 'size', parseInt(e.target.value))}
                              min="8"
                              max="144"
                            />
                          </label>

                          <label className="input-label">
                            Color:
                            <input
                              type="color"
                              className="color-input"
                              value={`#${textData.color || '000000'}`}
                              onChange={(e) => handleFormatChange(paragraphIndex, textIndex, 'color', e.target.value.substring(1))}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => addTextRun(paragraphIndex)}
                >
                  ➕ Añadir Texto
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Section;