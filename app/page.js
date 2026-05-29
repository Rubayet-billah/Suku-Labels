"use client";

import React, { useState } from "react";

export default function SukuLabelsApp() {
  const [phone, setPhone] = useState("01875685814");
  const [catNames, setCatNames] = useState(["SUKU BILAI", "SUKU"]);
  const [newCatName, setNewCatName] = useState("");
  const [error, setError] = useState("");

  const handleAddCat = (e) => {
    e.preventDefault();
    const name = newCatName.trim().toUpperCase();
    if (!name) {
      setError("Please enter a cat name.");
      return;
    }
    if (catNames.includes(name)) {
      setError("This cat name already exists in the list.");
      return;
    }
    setCatNames([...catNames, name]);
    setNewCatName("");
    setError("");
  };

  const handleDeleteCat = (nameToDelete) => {
    setCatNames(catNames.filter((name) => name !== nameToDelete));
  };

  const handleResetToDefaults = () => {
    setPhone("01875685814");
    setCatNames(["SUKU BILAI", "SUKU"]);
    setNewCatName("");
    setError("");
  };

  const triggerPrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Generate 8 labels per cat name
  const labelsCountPerCat = 8;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">

      {/* 1. UI Control Panel (Interactive Sidebar) - Hidden during print */}
      <aside className="w-full md:w-80 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col flex-shrink-0 print:hidden justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
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
            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400"
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
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="block w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Add Cat Name Input */}
            <div>
              <label htmlFor="catName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Manage Cat Names
              </label>
              <form onSubmit={handleAddCat} className="flex gap-2">
                <input
                  type="text"
                  name="catName"
                  id="catName"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Cat name"
                  className="block flex-1 min-w-0 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-md flex items-center justify-center transition-colors"
                  aria-label="Add cat name"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </form>
              {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
            </div>

            {/* Cat Names List */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Cat List ({catNames.length})
              </span>
              <div className="max-h-56 overflow-y-auto border border-slate-800 rounded-md divide-y divide-slate-800 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-800">
                {catNames.length === 0 ? (
                  <p className="p-3 text-xs text-slate-500 text-center italic">No cat names added.</p>
                ) : (
                  catNames.map((name) => (
                    <div key={name} className="flex items-center justify-between p-2.5 hover:bg-slate-800/50 transition-colors group">
                      <span className="text-sm font-medium text-slate-200 tracking-wide truncate">{name}</span>
                      <button
                        onClick={() => handleDeleteCat(name)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                        title={`Delete ${name}`}
                        aria-label={`Delete ${name}`}
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <button
              onClick={triggerPrint}
              disabled={catNames.length === 0}
              className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-600/20 transition-all cursor-pointer"
            >
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
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H7a2 2 0 00-2 2v3a2 2 0 00-2 2zm5-17h1a1 1 0 011 1v3a1 1 0 01-1 1h-1a1 1 0 01-1-1V4a1 1 0 011-1z"
                />
              </svg>
              Print Labels
            </button>

            <button
              onClick={handleResetToDefaults}
              className="w-full py-1.5 bg-transparent border border-slate-700 hover:border-slate-500 hover:bg-slate-900 active:bg-slate-950 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-md transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-900 pt-4 mt-6 text-[10px] text-slate-500 text-center">
          {/* improve contents */}
          <p>Locked to Verdana Styling (V4)</p>
          <p className="mt-1">Standard A4 Physical Alignment</p>
        </div>
      </aside>

      {/* 2. Print Preview & Grid Generation Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col items-center justify-start bg-slate-900 print:bg-white print:p-0 print:overflow-visible">

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
            The workspace below displays an accurate preview of the collar tags. When you print, the sidebar control panel will automatically hide, and the tag grid will format onto the A4 physical paper.
          </p>
        </div>

        {/* A4 Page View (Preview Wrapper) */}
        <div className="w-full flex items-start justify-center print:block print:w-auto">
          {catNames.length === 0 ? (
            <div className="print-grid min-h-[100px] flex items-center justify-center p-12 text-slate-400 italic text-sm print:hidden">
              Please add at least one cat name to generate tags.
            </div>
          ) : (
            <div className="print-grid">
              {catNames.map((name) => {
                const isShort = name.length <= 4;
                const letterSpacingStyle = isShort ? { letterSpacing: "1px" } : {};

                // Return exactly 8 labels per cat name
                return Array.from({ length: labelsCountPerCat }).map((_, index) => (
                  <div key={`${name}-${index}`} className="label-v4">
                    <span className="label-name" style={letterSpacingStyle}>
                      {name}
                    </span>
                    <span className="label-phone">{phone}</span>
                  </div>
                ));
              })}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
