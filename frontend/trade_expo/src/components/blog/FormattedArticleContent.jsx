import React from 'react';

/**
 * Parses inline formatting for hyperlinks, bold, italic, and underline.
 * Supports:
 * - Hyperlinks: [link text](https://example.com), <a href="https://example.com">link text</a>
 * - Bold: **bold**, <b>bold</b>, <strong>bold</strong>
 * - Underline: <u>underline</u>, <ins>underline</ins>, [u]underline[/u]
 * - Italic: *italic*, _italic_, <i>italic</i>, <em>italic</em>
 * - Strikethrough: ~~strike~~
 * Recursively parses nested combinations like **<u>[bold link](url)</u>**.
 */
export function parseInlineFormatting(text) {
  if (typeof text !== 'string' || !text) return [];

  // Match links, bold, underline, italic, strikethrough tokens
  const tokenRegex = /(\[([^\]]+)\]\(([^)\s]+)\)|<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>|\*\*(?:[^*]|\*(?!\*))+\*\*|<b>[\s\S]*?<\/b>|<strong>[\s\S]*?<\/strong>|<u>[\s\S]*?<\/u>|<ins>[\s\S]*?<\/ins>|\[u\][\s\S]*?\[\/u\]|\*(?:[^*])+\*|_(?:[^_])+_|<i>[\s\S]*?<\/i>|<em>[\s\S]*?<\/em>|~~[\s\S]*?~~)/gi;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }

    const token = match[0];

    // 1. Markdown Hyperlink: [link text](url)
    const mdLink = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (mdLink) {
      parts.push({
        type: 'link',
        url: mdLink[2],
        children: parseInlineFormatting(mdLink[1])
      });
      lastIndex = tokenRegex.lastIndex;
      continue;
    }

    // 2. HTML Hyperlink: <a href="url">link text</a>
    const htmlLink = token.match(/^<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>$/i);
    if (htmlLink) {
      parts.push({
        type: 'link',
        url: htmlLink[1],
        children: parseInlineFormatting(htmlLink[2])
      });
      lastIndex = tokenRegex.lastIndex;
      continue;
    }

    // 3. Bold
    if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2);
      parts.push({ type: 'bold', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<b>') && token.endsWith('</b>')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'bold', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<strong>') && token.endsWith('</strong>')) {
      const inner = token.slice(8, -9);
      parts.push({ type: 'bold', children: parseInlineFormatting(inner) });
    } 
    // 4. Underline
    else if (token.startsWith('<u>') && token.endsWith('</u>')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'underline', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<ins>') && token.endsWith('</ins>')) {
      const inner = token.slice(5, -6);
      parts.push({ type: 'underline', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('[u]') && token.endsWith('[/u]')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'underline', children: parseInlineFormatting(inner) });
    } 
    // 5. Strikethrough
    else if (token.startsWith('~~') && token.endsWith('~~')) {
      const inner = token.slice(2, -2);
      parts.push({ type: 'strike', children: parseInlineFormatting(inner) });
    } 
    // 6. Italic
    else if (token.startsWith('*') && token.endsWith('*')) {
      const inner = token.slice(1, -1);
      parts.push({ type: 'italic', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('_') && token.endsWith('_')) {
      const inner = token.slice(1, -1);
      parts.push({ type: 'italic', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<i>') && token.endsWith('</i>')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'italic', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<em>') && token.endsWith('</em>')) {
      const inner = token.slice(4, -5);
      parts.push({ type: 'italic', children: parseInlineFormatting(inner) });
    } else {
      parts.push({ type: 'text', content: token });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  return parts;
}

/**
 * Renders parsed inline tokens into React JSX elements.
 */
export function renderInlineNodes(nodes) {
  if (!nodes || !Array.isArray(nodes)) return null;

  return nodes.map((node, index) => {
    if (typeof node === 'string') return node;

    switch (node.type) {
      case 'text':
        return node.content;

      case 'link': {
        const isExternal = node.url && (node.url.startsWith('http://') || node.url.startsWith('https://') || node.url.startsWith('//'));
        return (
          <a
            key={index}
            href={node.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-brand-accent underline underline-offset-4 font-medium hover:text-brand-dark transition-colors inline cursor-pointer"
          >
            {renderInlineNodes(node.children)}
          </a>
        );
      }

      case 'bold':
        return (
          <strong key={index} className="font-bold text-brand-dark">
            {renderInlineNodes(node.children)}
          </strong>
        );

      case 'italic':
        return (
          <em key={index} className="italic">
            {renderInlineNodes(node.children)}
          </em>
        );

      case 'underline':
        return (
          <span key={index} className="underline underline-offset-4 decoration-brand-accent/80 font-normal">
            {renderInlineNodes(node.children)}
          </span>
        );

      case 'strike':
        return (
          <del key={index} className="line-through text-gray-400">
            {renderInlineNodes(node.children)}
          </del>
        );

      default:
        return node.content || null;
    }
  });
}

/**
 * Splits raw article content into structural blocks:
 * Headings (#, ##, ###), Quotes (>), Lists (*, 1.), Block alignment tags, and Paragraphs.
 * Supports full block alignment wrappers like [align=justify], [justify], etc.
 */
export function parseArticleBlocks(rawContent, defaultAlign = 'left') {
  if (!rawContent || typeof rawContent !== 'string') return [];
  // Strip any metadata comment header to ensure article body is clean
  const content = rawContent.replace(/<!--\[indiglobal-meta:[\s\S]*?\]-->/, '').trimStart();
  if (!content) return [];

  // Match alignment wrapper blocks:
  // 1. [align=left|center|right|justify]...[/align]
  // 2. [left|center|right|justify]...[/left|center|right|justify]
  // 3. <center>...</center>
  // 4. <(div|p) (style="text-align: ..." or align="...")>...</(div|p)>
  const alignBlockRegex = /(\[align=(left|center|right|justify)\]([\s\S]*?)\[\/align\]|\[(left|center|right|justify)\]([\s\S]*?)\[\/\4\]|<center>([\s\S]*?)<\/center>|<(div|p)\s+[^>]*?(?:style=["'][^"']*text-align:\s*(left|center|right|justify)[^"']*|align=["'](left|center|right|justify))[^>]*>([\s\S]*?)<\/\7>)/gi;

  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = alignBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textOutside = content.substring(lastIndex, match.index);
      if (textOutside.trim()) {
        segments.push({ align: defaultAlign, text: textOutside });
      }
    }

    let explicitAlign = defaultAlign;
    let innerText = '';

    if (match[1].toLowerCase().startsWith('[align=')) {
      explicitAlign = match[2].toLowerCase();
      innerText = match[3];
    } else if (match[1].startsWith('[') && !match[1].toLowerCase().startsWith('[align=')) {
      explicitAlign = match[4].toLowerCase();
      innerText = match[5];
    } else if (match[1].toLowerCase().startsWith('<center>')) {
      explicitAlign = 'center';
      innerText = match[6];
    } else {
      explicitAlign = (match[8] || match[9] || defaultAlign).toLowerCase();
      innerText = match[10];
    }

    if (innerText && innerText.trim()) {
      segments.push({ align: explicitAlign, text: innerText });
    }

    lastIndex = alignBlockRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    const trailingText = content.substring(lastIndex);
    if (trailingText.trim()) {
      segments.push({ align: defaultAlign, text: trailingText });
    }
  }

  // If no alignment wrapper was present, fallback to full text as single segment
  if (segments.length === 0 && content.trim()) {
    segments.push({ align: defaultAlign, text: content });
  }

  const blocks = [];

  for (const seg of segments) {
    const rawSections = seg.text.split(/\n\s*\n/);
    const segAlign = seg.align || defaultAlign;

    for (const s of rawSections) {
      const trimmed = s.trim();
      if (!trimmed) continue;

      // Heading 1
      if (trimmed.startsWith('# ')) {
        blocks.push({
          type: 'h1',
          text: trimmed.replace(/^#\s+/, ''),
          align: segAlign === 'justify' ? 'left' : segAlign
        });
        continue;
      }

      // Heading 2
      if (trimmed.startsWith('## ')) {
        blocks.push({
          type: 'h2',
          text: trimmed.replace(/^##\s+/, ''),
          align: segAlign === 'justify' ? 'left' : segAlign
        });
        continue;
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        blocks.push({
          type: 'h3',
          text: trimmed.replace(/^###\s+/, ''),
          align: segAlign === 'justify' ? 'left' : segAlign
        });
        continue;
      }

      // Blockquote (> quote)
      if (trimmed.startsWith('> ') || trimmed.startsWith('>')) {
        const quoteText = trimmed.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
        blocks.push({
          type: 'blockquote',
          text: quoteText,
          align: segAlign
        });
        continue;
      }

      // Split lines to detect list structures
      const lines = trimmed.split('\n');
      const isBulletList = lines.length > 0 && lines.every(l => l.trim().startsWith('* ') || l.trim().startsWith('- '));
      const isNumberedList = lines.length > 0 && lines.every(l => /^\d+\.\s+/.test(l.trim()));

      if (isBulletList) {
        blocks.push({
          type: 'bullet-list',
          items: lines.map(l => l.trim().replace(/^[\*\-]\s+/, '')),
          align: segAlign
        });
        continue;
      }

      if (isNumberedList) {
        blocks.push({
          type: 'numbered-list',
          items: lines.map(l => l.trim().replace(/^\d+\.\s+/, '')),
          align: segAlign
        });
        continue;
      }

      // Handle hybrid blocks where some lines are bullets
      if (lines.some(l => l.trim().startsWith('* ') || l.trim().startsWith('- ') || /^\d+\.\s+/.test(l.trim()))) {
        const subItems = [];
        let currentType = null;
        let currentLines = [];

        for (const line of lines) {
          const lineTrimmed = line.trim();
          const lineIsBullet = lineTrimmed.startsWith('* ') || lineTrimmed.startsWith('- ');
          const lineIsNumbered = /^\d+\.\s+/.test(lineTrimmed);

          let thisType = 'text';
          if (lineIsBullet) thisType = 'bullet';
          else if (lineIsNumbered) thisType = 'numbered';

          if (thisType !== currentType) {
            if (currentLines.length > 0) {
              subItems.push({ type: currentType, lines: currentLines });
            }
            currentType = thisType;
            currentLines = [line];
          } else {
            currentLines.push(line);
          }
        }

        if (currentLines.length > 0) {
          subItems.push({ type: currentType, lines: currentLines });
        }

        for (const sub of subItems) {
          if (sub.type === 'bullet') {
            blocks.push({
              type: 'bullet-list',
              items: sub.lines.map(l => l.trim().replace(/^[\*\-]\s+/, '')),
              align: segAlign
            });
          } else if (sub.type === 'numbered') {
            blocks.push({
              type: 'numbered-list',
              items: sub.lines.map(l => l.trim().replace(/^\d+\.\s+/, '')),
              align: segAlign
            });
          } else {
            blocks.push({
              type: 'paragraph',
              text: sub.lines.join('\n'),
              align: segAlign
            });
          }
        }
        continue;
      }

      // Standard paragraph
      blocks.push({
        type: 'paragraph',
        text: trimmed,
        align: segAlign
      });
    }
  }

  return blocks;
}

/**
 * FormattedArticleContent:
 * Reusable component for rendering formatted blog articles with hyperlinks, bold, italic,
 * underline, text alignment (including justified text), headings, blockquotes, and lists.
 */
const FormattedArticleContent = ({ content, textAlign = 'left', className = '' }) => {
  if (!content) return null;

  const validAlign = ['left', 'center', 'right', 'justify'].includes(textAlign) ? textAlign : 'left';
  const blocks = parseArticleBlocks(content, validAlign);

  const getAlignClass = (align) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'justify':
        return 'text-justify';
      case 'left':
      default:
        return 'text-left';
    }
  };

  const getAlignStyle = (align) => {
    const isJustify = (align || validAlign) === 'justify';
    return {
      textAlign: align || validAlign,
      textJustify: isJustify ? 'inter-word' : undefined,
      WebkitHyphens: isJustify ? 'auto' : undefined,
      msHyphens: isJustify ? 'auto' : undefined,
      hyphens: isJustify ? 'auto' : undefined
    };
  };

  return (
    <div className={`formatted-blog-content ${className}`}>
      {blocks.map((block, idx) => {
        const blockAlign = block.align || validAlign;
        const alignClass = getAlignClass(blockAlign);
        const alignStyle = getAlignStyle(blockAlign);

        switch (block.type) {
          case 'h1':
            return (
              <h1 
                key={idx} 
                style={alignStyle}
                className={`font-serif text-3xl sm:text-4xl text-brand-dark font-bold mt-10 mb-5 leading-tight ${alignClass}`}
              >
                {renderInlineNodes(parseInlineFormatting(block.text))}
              </h1>
            );

          case 'h2':
            return (
              <h2 
                key={idx} 
                style={alignStyle}
                className={`font-serif text-2xl sm:text-3xl text-brand-dark font-bold mt-8 mb-4 leading-snug pb-2 border-b border-gray-100 ${alignClass}`}
              >
                {renderInlineNodes(parseInlineFormatting(block.text))}
              </h2>
            );

          case 'h3':
            return (
              <h3 
                key={idx} 
                style={alignStyle}
                className={`font-serif text-xl sm:text-2xl text-brand-dark font-bold mt-6 mb-3 leading-snug ${alignClass}`}
              >
                {renderInlineNodes(parseInlineFormatting(block.text))}
              </h3>
            );

          case 'blockquote':
            return (
              <blockquote 
                key={idx} 
                style={alignStyle}
                className={`my-6 p-4 sm:p-5 border-l-4 border-brand-accent bg-brand-light/70 text-gray-700 italic rounded-r-xs shadow-2xs leading-relaxed ${alignClass}`}
              >
                {renderInlineNodes(parseInlineFormatting(block.text))}
              </blockquote>
            );

          case 'bullet-list':
            return (
              <ul key={idx} style={alignStyle} className={`my-6 space-y-2.5 pl-1 ${alignClass}`}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-700 leading-relaxed text-base sm:text-lg flex items-start gap-2.5">
                    <span className="text-brand-accent font-bold mt-1 text-base select-none shrink-0">•</span>
                    <span className="flex-1">
                      {renderInlineNodes(parseInlineFormatting(item))}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case 'numbered-list':
            return (
              <ol key={idx} style={alignStyle} className={`my-6 space-y-2.5 pl-6 list-decimal marker:text-brand-accent marker:font-bold ${alignClass}`}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-700 leading-relaxed text-base sm:text-lg pl-1">
                    {renderInlineNodes(parseInlineFormatting(item))}
                  </li>
                ))}
              </ol>
            );

          case 'paragraph':
          default:
            return (
              <p 
                key={idx} 
                style={alignStyle}
                className={`text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-light ${alignClass}`}
              >
                {renderInlineNodes(parseInlineFormatting(block.text))}
              </p>
            );
        }
      })}
    </div>
  );
};

export default FormattedArticleContent;
