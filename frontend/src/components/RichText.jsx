import React, { useRef, useState, useEffect } from 'react';

function RichTextEditor() {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [html, setHtml] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Khởi tạo nội dung ban đầu chỉ một lần
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = html;
    }
  }, []); // Chạy chỉ một lần khi mount

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    setHtml(editorRef.current.innerHTML); // Vẫn cập nhật sau lệnh định dạng
  };

  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  const handleHeading = (level) => {
    if (level === '') {
      execCommand('formatBlock', 'div');
    } else {
      execCommand('formatBlock', `h${level}`);
    }
  };
  const handleBulletList = () => execCommand('insertUnorderedList');
  const handleNumberedList = () => execCommand('insertOrderedList');

  const handleLink = () => {
    const url = prompt('Nhập URL (ví dụ: https://example.com):', 'https://');
    if (url) {
      const selection = window.getSelection();
      if (selection.toString().length === 0) {
        alert('Vui lòng bôi đen văn bản để tạo liên kết!');
        return;
      }
      const linkHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">${selection}</a>`;
      execCommand('insertHTML', linkHTML);
    }
  };

  const handleImageFromURL = () => {
    const src = prompt('Nhập URL ảnh:', 'https://');
    if (src) {
      execCommand('insertImage', src);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target.result;
        execCommand('insertImage', src);
      };
      reader.readAsDataURL(file);
    }
  };

  // THAY ĐỔI: Cập nhật html khi editor mất focus (onBlur), thay vì onInput
  const handleBlur = () => {
    const currentHtml = editorRef.current.innerHTML;
    setHtml(currentHtml);
    setShowPlaceholder(!currentHtml || currentHtml.trim() === '');
  };

  const handleFocus = () => {
    setShowPlaceholder(false);
  };

  const focusEditor = () => {
    editorRef.current.focus();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Toolbar */}
        <div 
          className="toolbar bg-gray-50 border-b border-gray-200 px-4 py-3 flex flex-wrap items-center gap-3"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => { focusEditor(); handleBold(); }} className="p-3 rounded hover:bg-gray-200 transition-colors" title="In đậm">
              <i className="fas fa-bold"></i>
            </button>
            <button type="button" onClick={() => { focusEditor(); handleItalic(); }} className="p-3 rounded hover:bg-gray-200 transition-colors" title="In nghiêng">
              <i className="fas fa-italic"></i>
            </button>
            <button type="button" onClick={() => { focusEditor(); handleUnderline(); }} className="p-3 rounded hover:bg-gray-200 transition-colors" title="Gạch chân">
              <i className="fas fa-underline"></i>
            </button>
          </div>

          <div className="w-px h-8 bg-gray-300 mx-2" />

          <select
            onChange={(e) => { focusEditor(); handleHeading(e.target.value); }}
            defaultValue=""
            className="px-4 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Normal</option>
            <option value="1">Tiêu đề 1</option>
            <option value="2">Tiêu đề 2</option>
            <option value="3">Tiêu đề 3</option>
          </select>

          <div className="w-px h-8 bg-gray-300 mx-2" />

          <button type="button" onClick={() => { focusEditor(); handleBulletList(); }} className="p-3 rounded hover:bg-gray-200 transition-colors" title="Danh sách gạch đầu dòng">
            <i className="fas fa-list-ul"></i>
          </button>
          <button type="button" onClick={() => { focusEditor(); handleNumberedList(); }} className="p-3 rounded hover:bg-gray-200 transition-colors" title="Danh sách số">
            <i className="fas fa-list-ol"></i>
          </button>

          <div className="w-px h-8 bg-gray-300 mx-2" />

          <button type="button" onClick={() => { focusEditor(); handleLink(); }} className="p-3 rounded hover:bg-gray-200 transition-colors text-blue-600" title="Chèn liên kết">
            <i className="fas fa-link"></i>
          </button>

          <button type="button" onClick={() => { focusEditor(); handleImageFromURL(); }} className="p-3 rounded hover:bg-gray-200 transition-colors" title="Chèn ảnh từ URL">
            <i className="fas fa-image"></i>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-5 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            title="Tải ảnh lên"
          >
            <i className="fas fa-upload"></i>
            Tải ảnh lên
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        {/* Editor */}
        <div className="relative">
        <div
          ref={editorRef}
          contentEditable={true}
          className="editor min-h-96 px-8 py-6 prose prose-lg max-w-none focus:outline-none"
          onBlur={handleBlur} // THAY ĐỔI: Thêm onBlur để cập nhật html
          onFocus={handleFocus}
          onMouseDown={focusEditor}
        />
        {
          showPlaceholder
          ? <div className="absolute top-6 left-8 text-slate-900/50"> Nhập nội dung ... </div>
          : <></>
        }
        </div>

        {/* Style cho hình ảnh và link */}
        <style jsx>{`
          .editor img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 12px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .editor a {
            color: #2563eb;
            text-decoration: underline;
          }
          .editor a:hover {
            color: #1d4ed8;
          }
        `}</style>
      </div>

      {/* Debug HTML */}
      <details className="mt-8 bg-gray-50 rounded-lg p-4">
        <summary className="cursor-pointer font-semibold text-gray-700 mb-3">
          Xem mã HTML hiện tại (click để mở/rút gọn)
        </summary>
        <textarea
          value={html}
          readOnly
          className="w-full h-64 p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded-lg resize-none focus:outline-none"
        />
      </details>
    </div>
  );
}

export default RichTextEditor;