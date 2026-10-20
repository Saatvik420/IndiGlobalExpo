import React from 'react';

/**
 * Parses inline formatting for bold, italic, and underline.
 * Supports:
 * - Bold: **bold**, <b>bold</b>, <strong>bold</strong>
 * - Underline: <u>underline</u>, <ins>underline</ins>, [u]underline[/u]
 * - Italic: *italic*, _italic_, <i>italic</i>, <em>italic</em>
 * - Strikethrough: ~~strike~~
 * Recursively parses nested combinations like **<u>bold & underline</u>**.
 */
export function parseInlineFormatting(text) {
  if (typeof text !== 'string' || !text) return [];

  // Match supported inline markdown and html tokens
  const tokenRegex = /(\*\*(?:[^*]|\*(?!\*))+\*\*|<b>[\s\S]*?<\/b>|<strong>[\s\S]*?<\/strong>|<u>[\s\S]*?<\/u>|<ins>[\s\S]*?<\/ins>|\[u\][\s\S]*?\[\/u\]|\*(?:[^*])+\*|_(?:[^_])+_|<i>[\s\S]*?<\/i>|<em>[\s\S]*?<\/em>|~~[\s\S]*?~~)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2);
      parts.push({ type: 'bold', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<b>') && token.endsWith('</b>')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'bold', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<strong>') && token.endsWith('</strong>')) {
      const inner = token.slice(8, -9);
      parts.push({ type: 'bold', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<u>') && token.endsWith('</u>')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'underline', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('<ins>') && token.endsWith('</ins>')) {
      const inner = token.slice(5, -6);
      parts.push({ type: 'underline', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('[u]') && token.endsWith('[/u]')) {
      const inner = token.slice(3, -4);
      parts.push({ type: 'underline', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('~~') && token.endsWith('~~')) {
      const inner = token.slice(2, -2);
      parts.push({ type: 'strike', children: parseInlineFormatting(inner) });
    } else if (token.startsWith('*') && token.endsWith('*')) {
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
 */
export function parseArticleBlocks(content, defaultAlign = 'left') {
  if (!content || typeof content !== 'string') return [];

  const rawSections = content.split(/\n\s*\n/);
  const blocks = [];

  for (const s of rawSections) {
    const trimmed = s.trim();
    if (!trimmed) continue;

    // Check custom alignment tag [align=center|right|justify|left]...[/align]
    const alignTagMatch = trimmed.match(/^\[align=(left|center|right|justify)\]([\s\S]*?)\[\/align\]$/i);
    if (alignTagMatch) {
      const explicitAlign = alignTagMatch[1].toLowerCase();
      const innerText = alignTagMatch[2].trim();
      blocks.push({
        type: 'paragraph',
        text: innerText,
        align: explicitAlign
      });
      continue;
    }

    // Check center html tag <center>...</center>
    const centerMatch = trimmed.match(/^<center>([\s\S]*?)<\/center>$/i);
    if (centerMatch) {
      blocks.push({
        type: 'paragraph',
        text: centerMatch[1].trim(),
        align: 'center'
      });
      continue;
    }

    // Check div style or align tag <div style="text-align: center">...</div> or <div align="center">
    const divAlignMatch = trimmed.match(/^<div\s+(?:style=["']text-align:\s*(left|center|right|justify)["']|align=["'](left|center|right|justify)["'])>([\s\S]*?)<\/div>$/i);
    if (divAlignMatch) {
      const explicitAlign = (divAlignMatch[1] || divAlignMatch[2]).toLowerCase();
      blocks.push({
        type: 'paragraph',
        text: divAlignMatch[3].trim(),
        align: explicitAlign
      });
      continue;
    }

    // Heading 1
    if (trimmed.startsWith('# ')) {
      blocks.push({
        type: 'h1',
        text: trimmed.replace(/^#\s+/, ''),
        align: defaultAlign
      });
      continue;
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
      blocks.push({
        type: 'h2',
        text: trimmed.replace(/^##\s+/, ''),
        align: defaultAlign
      });
      continue;
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      blocks.push({
        type: 'h3',
        text: trimmed.replace(/^###\s+/, ''),
        align: defaultAlign
      });
      continue;
    }

    // Blockquote (> quote)
    if (trimmed.startsWith('> ') || trimmed.startsWith('>')) {
      const quoteText = trimmed.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
      blocks.push({
        type: 'blockquote',
        text: quoteText,
        align: defaultAlign
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
        align: defaultAlign
      });
      continue;
    }

    if (isNumberedList) {
      blocks.push({
        type: 'numbered-list',
        items: lines.map(l => l.trim().replace(/^\d+\.\s+/, '')),
        align: defaultAlign
      });
      continue;
    }

    // Handle hybrid blocks where some lines are bullets
    if (lines.some(l => l.trim().startsWith('* ') || l.trim().startsWith('- ') || /^\d+\.\s+/.test(l.trim()))) {
      // Decompose mixed block into sub-blocks
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
            align: defaultAlign
          });
        } else if (sub.type === 'numbered') {
          blocks.push({
            type: 'numbered-list',
            items: sub.lines.map(l => l.trim().replace(/^\d+\.\s+/, '')),
            align: defaultAlign
          });
        } else {
          blocks.push({
            type: 'paragraph',
            text: sub.lines.join('\n'),
            align: defaultAlign
          });
        }
      }
      continue;
    }

    // Standard paragraph
    blocks.push({
      type: 'paragraph',
      text: trimmed,
      align: defaultAlign
    });
  }

  return blocks;
}

/**
 * FormattedArticleContent:
 * Reusable component for rendering formatted blog articles with bold, italic,
 * underline, text alignment, headings, blockquotes, and lists.
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
        return 'text-justify [text-justify:inter-word]';
      case 'left':
      default:
        return 'text-left';
    }
  };

  const getAlignStyle = (align) => ({
    textAlign: align || validAlign,
    textJustify: (align || validAlign) === 'justify' ? 'inter-word' : undefined
  });

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
