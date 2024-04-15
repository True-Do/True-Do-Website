'use client';

import { useCallback } from 'react';

import Image from 'next/image';

const iconSize = 20;

const ToolTip = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-row flex-wrap space-x-3 mb-2 p-2 rounded-xl justify-center md:justify-start sticky top-5 bg-light-off-white z-50'>
      <section className='space-x-3 flex flex-row'>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          h2
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <section className='space-x-3 flex flex-row items-center'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='bold'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB2klEQVR4nO3ZO2tUQRgG4Aejxi7YKIgi2HhpRKxsrBQLESstBLHUkMbaG/4FxVKMjY0gRiXgBTSFiuANvHWLlhJBFEG8kZEDR0iVnTVzzpk9nBe+9oUHdne+naFLly6LzTpcw70EcwdXMYnzmMBujKkhRxEqnl8l9DCWVAUZrwEyf15jRxsgAT9woA2QgN/Y1gZIwFOMtAESsK9uyHv0FphZzP0HZLJuyMqIruJjshGn8CWy91WOkPnZgq8RvZ9yhxQ5G9E7h2W5Q3ZGQkZyh2yN6J1Ngagasjei9+4wQC5G9E7kDil2qT8Rv1hjdUOKvWhDn9mEg7gR2XkoFWIQSOo5kxLRFOR0akRTkO84mXLzbQoSypnCaBsgAZfqhkyVNyQLzXXM4POAmD25niPFTcmu8h9gTPeLXCH/shy3I/u35wwpsj7ihA8pzpWqIUWeRPTfHAbIlTq+J+M1QC5H9PeGAXI/ov9d7pDV5SV2v/4HOUOK9WM6sv9CjpDR8gbxWWR3wP66IDMRDz2P8AE/BwAEfEyxPDa9NAYcXywiB8hjLB12SA9rUiCahDzH2lSIJiDfyjvhFRLnWE2AtziBVSrKZrzs84gzyLzBQ9zCORwpnxi6dOnSRd/8BU217GgCnXt6AAAAAElFTkSuQmCC'
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='italics'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAq0lEQVR4nO3WsQnCYBRF4ZvSXjKA2EsGkPTiAGIvDiBZIziA2AcHEFsjDhDSSwYQayslEOGC2B4R/wOvesXXPZ4UCr1XSnp8mHb3FfgooK2BC4EdDJ6QcG3wiIRvBvcptGfoXVJEwUODLwJLDT6R8NzggoQzg3MSXhu8IuGdwTMSPhs8JuHG4AGFRt3ReMHtMUGKDb0KLDG4IuGpwXsSXhq8IcDyb3+t0G/1BLG4VBFDInqeAAAAAElFTkSuQmCC'
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <Image
            width={iconSize}
            height={iconSize}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWUlEQVR4nO2UMQ4AIAgD+/9nSXxXXd0UbVjoJYxwCYQCpisTAEUVGTHFdc2p4XZwWhwAhkB8mpPmeZW/WFwGfWMlUR2XSrE0PHpCv1MVbLPqUIeFQuywMNhZUm2YG7HY9jcAAAAASUVORK5CYII='
            alt='strikethru'
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='code'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAf0lEQVR4nO2USwqAIBRFz8S99Zm4oVpGzduAe9JW0cQmbxARkpoU2IE7uco78AThJ5IeWAGfGAe0IYHLGO4lNiTwD+V9QSq+ToECFmA4dKN0KlegAANsQHfoO+nMSRItmGWQvrir5Wz6tECVXlHxR46lAoEt/V03mRIrM364zQ50zqudQuzNnwAAAABJRU5ErkJggg=='
          ></Image>
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <section className='space-x-3 flex flex-row items-center'>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}
        >
          <Image
            width={iconSize}
            height={iconSize}
            alt='Task List'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABC0lEQVR4nO3YMUoDQRQG4G9Zi2CCWAuSAwheIuARrIOk8AaS0gPYi4VnCHgCa0sbsbXT0kILIRKIsCwhadS8Wd4HUyzsDPwMu/w8Ukq/rcJAB0zxjGMFG+ELc3zgTIGGeFuG+Fmv2FeQHh5aIRY3cyK4PvYaz7etEIt1sWLf/B/XRjVmeMQhzlccMlv+vUIHuWm8/ILP1gFPrdsKGWSyYfM7jtbsDxNkF3drNp8qSI3rFSGuFOqyEeIeOwo2Xn7wBzpgoKOqroSbZvsNYpjtd4v62X7F6FoL2X5l+/0bdbbfwMbZfgtQZfsNZJSz3yB6Ofu1vdJY5+xXnJHpJGe/AdXZfgMbZ/tNKYnkG+vm+Sfg/YlgAAAAAElFTkSuQmCC'
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <Image
            width={iconSize}
            height={iconSize}
            alt='Bullet List'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nO3VQQqAMAxE0X88S29tb2K9hyJ0EQQhbirCf5BVFgOBISBNVIEd6ECZGdyBY8x227WwezPtq+A1E1xG+BW6pO8kJdjjyB7rn6r/OLDHEk9OW8N7ef+eTPQAAAAASUVORK5CYII='
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='HR'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nO3RQQ0AAAgCQPuX1gAGcOrdxh9GBAAAAABP5dI004UMOfsIAAAAAOcVg2G3SeBKR5YAAAAASUVORK5CYII='
          ></Image>
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <section className='space-x-3 flex flex-row items-center'>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Left Align'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPklEQVR4nO3UwQkAIBADwfRflluY1iAYRNyBeweOkEQ/Isk8fNwKHv1/aQOt8jSCLc9bcLnUgsulFlwuPW0B+GG2kNfDhr8AAAAASUVORK5CYII='
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Center Align'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOUlEQVR4nGNgGAUkgsMMDAz/KcSHaW3BIYYRAQ5TO+ypYcEhhhEBDo/mg0EDDo/mgwEDh0fzwfADAKYunqj3+GEzAAAAAElFTkSuQmCC'
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Right Align'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQUlEQVR4nO3U0QkAMAhDwew/lhnMjlAoWil9B/4aEImEH1lSFo+ngqP/XijkrufqCI7tVtxkmgtTTHPhlGkuPG0BO0e2kCAtTu4AAAAASUVORK5CYII='
          ></Image>
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <button onClick={addImage}>
        <Image
          height={iconSize}
          width={iconSize}
          alt='image'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAArUlEQVR4nO3UvQkCQRiE4QcEwdxI7MDQTDRXzE1twjrsQMTIHixAMLQD8UyMFQxPhAvkWIT7Q4UbmOQbZl/4dllq/ZKmuCAu6AiTECAq4fA48TkEiEv2bwEGGFYJGGL01yuKU75hgXsZgGtgNks686KAHRrYvs2Wqd46L+CEdpK1cMAezVTvlR2zAh7op/IuOqEieoH7+AjYyK7V159pVPVnNykJcsY4x4prqUZPeZ0O9KrHMIQAAAAASUVORK5CYII='
        ></Image>
      </button>
    </div>
  );
};

export default ToolTip;
