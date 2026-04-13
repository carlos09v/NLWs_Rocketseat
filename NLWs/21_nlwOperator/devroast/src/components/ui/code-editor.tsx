"use client";

import hljs from "highlight.js";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { tv } from "tailwind-variants";
import { Button } from "./button";
import { Switch } from "./switch";

const editorVariants = tv({
  slots: {
    root: "space-y-4 w-full max-w-195 mx-auto",
    container:
      "relative w-full overflow-hidden rounded-md border border-border-strong bg-layer-bg-input font-mono text-13",
    header:
      "flex h-10 items-center gap-3 border-b border-border-strong px-4 bg-background/50",
    editorWrapper: "flex h-[360px] w-full",
    gutter:
      "flex w-12 shrink-0 flex-col items-end gap-0 border-r border-border-strong bg-layer-surface-alt py-4 pr-3 text-right text-content-text-tertiary select-none overflow-hidden",
    editArea: "relative flex-1 h-full overflow-hidden",
    textarea:
      "absolute inset-0 z-10 w-full h-full resize-none border-0 bg-transparent text-left font-mono text-13 leading-[24px] text-transparent caret-foreground outline-none placeholder:text-content-text-tertiary overflow-auto box-border whitespace-pre p-4 [tab-size:4]",
    highlightLayer:
      "absolute inset-0 z-0 font-mono text-13 leading-[24px] pointer-events-none whitespace-pre overflow-hidden box-border p-4 [tab-size:4]",
    footer: "flex items-center justify-between",
    controls: "flex items-center gap-4",
    switchLabel: "inline-flex items-center gap-3",
    statusText: "font-sans text-xs text-content-text-tertiary",
  },
})

export function CodeEditor() {
  const CODE_LIMIT = 2000;
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [roastMode, setRoastMode] = useState(false);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);

  const {
    root,
    container,
    header,
    editorWrapper,
    gutter,
    editArea,
    textarea,
    highlightLayer,
    footer,
    controls,
    switchLabel,
    statusText,
  } = editorVariants();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (highlightLayerRef.current) {
      highlightLayerRef.current.scrollTop = scrollTop;
      highlightLayerRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
  };

  useEffect(() => {
    async function initShiki() {
      try {
        const h = await createHighlighter({
          themes: ["vesper"],
          langs: [
            "javascript",
            "typescript",
            "tsx",
            "jsx",
            "css",
            "html",
            "python",
            "rust",
            "go",
            "sql",
            "lisp",
            "json",
            "markdown",
          ],
        });
        setHighlighter(h);
      } catch (e) {
        console.error("Failed to load Shiki:", e);
      } finally {
        setIsLoading(false);
      }
    }
    initShiki();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!manualLanguage && code.trim()) {
        const supportedLanguages = [
          "javascript",
          "typescript",
          "tsx",
          "jsx",
          "css",
          "html",
          "python",
          "rust",
          "go",
          "sql",
          "lisp",
          "json",
          "markdown",
        ];
        const result = hljs.highlightAuto(code, supportedLanguages);
        let detectedLang = result.language;

        if (detectedLang === "javascript") {
          const isTS =
            /(:\s*[A-Z][\w<>{}]*|interface\s+\w+|type\s+\w+|=|readonly\s+)/.test(
              code,
            );
          const isJSX = /<[A-Z]/.test(code);
          if (isTS && isJSX) detectedLang = "tsx";
          else if (isTS) detectedLang = "typescript";
        }

        console.log("Detected language:", detectedLang);
        if (detectedLang) {
          setLanguage(detectedLang);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [code, manualLanguage]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (lang: string) => {
    setManualLanguage(lang);
    setLanguage(lang);
  };

  const isSubmitDisabled = code.trim().length === 0 || code.length > CODE_LIMIT;

  const highlightedCode = highlighter
    ? (() => {
        try {
          return highlighter.codeToHtml(code, {
            lang: language,
            theme: "vesper",
          });
        } catch (_e) {
          return highlighter.codeToHtml(code, {
            lang: "text",
            theme: "vesper",
          });
        }
      })()
    : code;

  return (
    <div className={root()}>
      <div className={container()}>
        <div className={header()}>
          <div className="flex gap-1.5">
            <span className="size-2.5 shrink-0 rounded-full bg-accent-red" />
            <span className="size-2.5 shrink-0 rounded-full bg-amber-accent" />
            <span className="size-2.5 shrink-0 rounded-full bg-accent-green" />
          </div>
          <div className="min-w-0 flex-1" />

          <div className="relative flex items-center">
            <select
              value={manualLanguage || language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="appearance-none bg-transparent pr-5 text-xs text-content-text-tertiary outline-none cursor-pointer transition-colors"
            >
              <option value="">Auto-detect</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="tsx">TSX</option>
              <option value="jsx">JSX</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="python">Python</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
              <option value="sql">SQL</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-1 size-3 text-content-text-tertiary" />
          </div>
        </div>

        <div className={editorWrapper()}>
          {isLoading ? (
            <div className="flex h-70 items-center justify-center text-xs text-content-text-tertiary font-mono w-full">
              loading_shiki...
            </div>
          ) : (
            <>
              <div ref={gutterRef} className={gutter()}>
                {Array.from({
                  length: Math.max(8, code.split("\n").length),
                }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <div className={editArea()}>
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={handleCodeChange}
                  onScroll={handleScroll}
                  placeholder="// paste your code here"
                  className={textarea()}
                  spellCheck={false}
                />
                <div
                  ref={highlightLayerRef}
                  className={highlightLayer()}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </div>
            </>
          )}
        </div>
        <div
          className={`absolute bottom-2 right-4 text-[10px] font-mono transition-colors ${
            code.length > CODE_LIMIT
              ? "text-accent-red"
              : "text-content-text-tertiary"
          }`}
        >
          {code.length}/{CODE_LIMIT}
        </div>
      </div>

      <div className={footer()}>
        <div className={controls()}>
          <div className={switchLabel()}>
            <Switch
              size="sm"
              checked={roastMode}
              onCheckedChange={(checked) => setRoastMode(Boolean(checked))}
            />
            <span className="font-mono text-xs text-accent-green">
              roast mode
            </span>
          </div>
          <span className={statusText()}>
            {isSubmitDisabled
              ? "enter your code to roast it"
              : "maximum sarcasm enabled"}
          </span>
        </div>

        <Button variant="primary" disabled={isSubmitDisabled} type="button">
          roast_my_code
        </Button>
      </div>
    </div>
  );
}
