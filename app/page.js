"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SukuLabelsApp() {
  const [defaultPhone, setDefaultPhone] = useState("01875685814");
  const [cats, setCats] = useState([
    { id: "SUKU-default", name: "SUKU", phone: "01875685814", labelCount: 8 },
    { id: "KITTY-default", name: "KITTY", phone: "01875685814", labelCount: 8 },
  ]);
  const [newCatName, setNewCatName] = useState("");
  const [newCatLabels, setNewCatLabels] = useState(8);
  const [error, setError] = useState("");

  // States to control responsive scaling on-screen
  const [scale, setScale] = useState(1);
  const [gridHeight, setGridHeight] = useState(0);

  const parentRef = useRef(null);
  const gridRef = useRef(null);

  // Measure and compute scale ratio dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !parentRef.current || !gridRef.current) return;

    const handleResize = () => {
      const parentElement = parentRef.current;
      const gridElement = gridRef.current;

      if (parentElement && gridElement) {
        const parentWidth = parentElement.offsetWidth;
        const targetWidth = 660; // Natural width of the physical A4 print-grid

        // Query the inner grid directly to get the accurate unscaled height
        const innerGrid = gridElement.querySelector(".print-grid");
        const unscaledHeight = innerGrid ? innerGrid.scrollHeight : gridElement.scrollHeight;

        if (parentWidth < targetWidth && parentWidth > 0) {
          const ratio = parentWidth / targetWidth;
          setScale(ratio);
          setGridHeight(unscaledHeight * ratio);
        } else {
          setScale(1);
          setGridHeight(unscaledHeight);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(parentRef.current);
    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [cats, defaultPhone]);

  const handleAddCat = (e) => {
    e.preventDefault();
    const name = newCatName.trim().toUpperCase();
    if (!name) {
      setError("Please enter a cat name.");
      return;
    }
    if (cats.some((cat) => cat.name === name)) {
      setError("This cat name already exists in the list.");
      return;
    }
    const newCat = {
      id: `${name}-${Date.now()}`,
      name: name,
      phone: defaultPhone,
      labelCount: newCatLabels,
    };
    setCats([...cats, newCat]);
    setNewCatName("");
    setNewCatLabels(8);
    setError("");
  };

  const handleUpdateCat = (id, field, value) => {
    setCats(
      cats.map((cat) => {
        if (cat.id === id) {
          return { ...cat, [field]: value };
        }
        return cat;
      })
    );
  };

  const handleDeleteCat = (idToDelete) => {
    setCats(cats.filter((cat) => cat.id !== idToDelete));
  };

  const handleResetToDefaults = () => {
    setDefaultPhone("01875685814");
    setCats([
      { id: "SUKU-default", name: "SUKU", phone: "01875685814", labelCount: 8 },
      { id: "KITTY-default", name: "KITTY", phone: "01875685814", labelCount: 8 },
    ]);
    setNewCatName("");
    setNewCatLabels(8);
    setError("");
  };

  const triggerPrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const labelMultiples = [4, 8, 12, 16, 20, 24, 32, 40, 48];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. UI Control Panel (Interactive Sidebar) - Hidden during print */}
      <aside className="w-full md:w-80 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col flex-shrink-0 print:hidden justify-between">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Suku Labels</h1>
              <p className="text-xs text-slate-400">Collar Tag Print Generator</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            {/* Default Phone Input */}
            <div>
              <label htmlFor="defaultPhone" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Default Phone Number (For New Cats)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg
                    className="h-3.5 w-3.5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="defaultPhone"
                  id="defaultPhone"
                  value={defaultPhone}
                  onChange={(e) => setDefaultPhone(e.target.value)}
                  placeholder="Default phone number"
                  className="block w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Add Cat Name Form */}
            <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg space-y-3">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Add New Cat Tag
              </span>
              <form onSubmit={handleAddCat} className="space-y-2">
                <div>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="CAT NAME"
                    className="block w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase tracking-wide"
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <select
                      value={newCatLabels}
                      onChange={(e) => setNewCatLabels(parseInt(e.target.value))}
                      className="block w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {labelMultiples.map((count) => (
                        <option key={count} value={count}>
                          {count} labels
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
              {error && <p className="text-[10px] text-rose-400 font-medium">{error}</p>}
            </div>

            {/* Cats List with Specific Editors */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Cats ({cats.length})
              </span>
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {cats.length === 0 ? (
                  <p className="p-4 text-xs text-slate-600 text-center italic border border-dashed border-slate-800 rounded-lg">
                    No tags generated.
                  </p>
                ) : (
                  cats.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-3 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-lg space-y-2.5 transition-all group"
                    >
                      {/* Name and Delete Row */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-100 tracking-wider uppercase truncate">
                          {cat.name}
                        </span>
                        <button
                          onClick={() => handleDeleteCat(cat.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer"
                          title={`Delete ${cat.name}`}
                          aria-label={`Delete ${cat.name}`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Editing Parameters Row */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Specific Phone */}
                        <div>
                          <label className="text-[9px] text-slate-500 font-bold block mb-0.5 uppercase tracking-wide">
                            Phone
                          </label>
                          <input
                            type="text"
                            value={cat.phone}
                            onChange={(e) => handleUpdateCat(cat.id, "phone", e.target.value)}
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                          />
                        </div>

                        {/* Specific Label Count */}
                        <div>
                          <label className="text-[9px] text-slate-500 font-bold block mb-0.5 uppercase tracking-wide">
                            Labels
                          </label>
                          <select
                            value={cat.labelCount}
                            onChange={(e) => handleUpdateCat(cat.id, "labelCount", parseInt(e.target.value))}
                            className="w-full px-1.5 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
                          >
                            {labelMultiples.map((count) => (
                              <option key={count} value={count}>
                                {count} tags
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={triggerPrint}
              disabled={cats.length === 0}
              className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H7a2 2 0 00-2 2v3a2 2 0 00-2 2zm5-17h1a1 1 0 011 1v3a1 1 0 01-1 1h-1a1 1 0 01-1-1V4a1 1 0 011-1z"
                />
              </svg>
              Print Labels
            </button>
            
            <button
              onClick={handleResetToDefaults}
              className="w-full py-1.5 bg-transparent border border-slate-800 hover:border-slate-600 hover:bg-slate-900 active:bg-slate-950 text-slate-500 hover:text-slate-300 text-[10px] font-semibold rounded-md transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-900 pt-3 mt-4 text-[10px] text-slate-600 text-center">
          <p>Locked to Verdana Styling (V4)</p>
          <p className="mt-0.5">Standard A4 Physical Alignment</p>
        </div>
      </aside>

      {/* 2. Print Preview & Grid Generation Workspace */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col items-center justify-start bg-slate-900 print:bg-white print:p-0 print:overflow-visible">
        
        {/* Helper Hint - Screen Only */}
        <div className="mb-6 w-full max-w-4xl text-center md:text-left print:hidden bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The workspace below displays an accurate preview of the collar tags. The layout matches the physical A4 alignment, scaled dynamically to fit your screen. When you print, it prints at exactly 100% scale.
          </p>
        </div>

        {/* A4 Page View (Preview Wrapper with dynamic JS scaling on screen) */}
        <div className="w-full flex items-start justify-center print:block print:w-auto">
          {cats.length === 0 ? (
            <div className="print-grid min-h-[100px] flex items-center justify-center p-12 text-slate-500 italic text-sm print:hidden">
              Please add at least one cat name to generate tags.
            </div>
          ) : (
            <div 
              ref={parentRef}
              style={{ 
                height: scale < 1 ? `${gridHeight}px` : "auto", 
                width: "100%",
                display: "flex", 
                justifyContent: "center", 
                alignItems: "flex-start",
                overflow: "hidden"
              }}
              className="print:h-auto print:w-auto print:overflow-visible"
            >
              <div 
                ref={gridRef}
                style={{ 
                  transform: scale < 1 ? `scale(${scale})` : "none", 
                  transformOrigin: "top center",
                  flexShrink: 0
                }}
                className="print:transform-none"
              >
                <div className="print-grid">
                  {cats.flatMap((cat) => {
                    const isShort = cat.name.length <= 4;
                    const letterSpacingStyle = isShort ? { letterSpacing: "1px" } : {};
                    
                    // Return dynamic number of labels per cat name
                    return Array.from({ length: cat.labelCount }).map((_, index) => (
                      <div key={`${cat.id}-${index}`} className="label-v4">
                        <span className="label-name" style={letterSpacingStyle}>
                          {cat.name}
                        </span>
                        <span className="label-phone">{cat.phone}</span>
                      </div>
                    ));
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
