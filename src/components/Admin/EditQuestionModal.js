import React, { useState, useEffect, useRef } from "react";
import { adminFetch } from "../../utils/adminApi";
import { saveQuestionOverride } from "../../utils/questionSync";

function EditQuestionModal({ isOpen, question, onSaveSuccess, onClose }) {
  const [questionNo, setQuestionNo] = useState("");
  const [promptText, setPromptText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState([]);
  const [points, setPoints] = useState(10);
  const [exhibitImage, setExhibitImage] = useState("");
  const [originalSourceImage, setOriginalSourceImage] = useState("");
  const [cliSnippet, setCliSnippet] = useState("");
  const [isDragDrop, setIsDragDrop] = useState(false);
  const [dragDropJson, setDragDropJson] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const exhibitFileInputRef = useRef(null);
  const sourceFileInputRef = useRef(null);
  const [isUploadingExhibit, setIsUploadingExhibit] = useState(false);
  const [isUploadingSource, setIsUploadingSource] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState("");

  const handleImageUpload = async (file, type) => {
    if (!file) return;
    const isExhibit = type === "exhibit";
    if (isExhibit) setIsUploadingExhibit(true);
    else setIsUploadingSource(true);
    setUploadFeedback("");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);
      formData.append("adminEmail", "candidate@ccna.com");

      const token = localStorage.getItem("ccna_auth_token") || "";
      const headers = {
        "X-Admin-Email": "candidate@ccna.com",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["X-Admin-Token"] = token;
      }

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to upload image file.");
      }

      if (isExhibit) {
        setExhibitImage(data.path);
        setUploadFeedback("Exhibit diagram uploaded successfully!");
      } else {
        setOriginalSourceImage(data.path);
        setUploadFeedback("Original source dump uploaded successfully!");
      }

      setTimeout(() => {
        setUploadFeedback("");
      }, 4000);
    } catch (err) {
      console.error("Image upload failed:", err);
      setErrorMsg(err.message || "Failed to upload image.");
    } finally {
      if (isExhibit) setIsUploadingExhibit(false);
      else setIsUploadingSource(false);
    }
  };

  useEffect(() => {
    if (question && isOpen) {
      setQuestionNo(question.questionNo || `Question #${question.id}`);
      setPromptText(question.question || "");
      setOptions(Array.isArray(question.options) ? [...question.options] : []);
      const corr = Array.isArray(question.correctOption)
        ? [...question.correctOption]
        : typeof question.correctOption === "number"
        ? [question.correctOption]
        : [];
      setCorrectOption(corr);
      setPoints(question.points || 10);
      setExhibitImage(question.exhibitImage || "");
      setOriginalSourceImage(question.originalSourceImage || "");
      setCliSnippet(question.cliSnippet || "");

      const isDD = question.type === "drag_drop" || Boolean(question.dragDropData);
      setIsDragDrop(isDD);
      if (question.dragDropData) {
        setDragDropJson(JSON.stringify(question.dragDropData, null, 2));
      } else {
        setDragDropJson("");
      }

      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [question, isOpen]);

  if (!isOpen || !question) return null;

  const handleOptionChange = (idx, value) => {
    const updated = [...options];
    updated[idx] = value;
    setOptions(updated);
  };

  const handleToggleCorrect = (idx) => {
    if (correctOption.includes(idx)) {
      setCorrectOption(correctOption.filter((i) => i !== idx));
    } else {
      setCorrectOption([...correctOption, idx].sort((a, b) => a - b));
    }
  };

  const handleAddOption = () => {
    const letter = String.fromCharCode(65 + options.length);
    setOptions([...options, `${letter}. New Option`]);
  };

  const handleRemoveOption = (idx) => {
    if (options.length <= 2) {
      setErrorMsg("A question must have at least 2 options.");
      return;
    }
    const updated = options.filter((_, i) => i !== idx);
    setOptions(updated);

    // Adjust correct options indices
    const updatedCorrect = correctOption
      .filter((i) => i !== idx)
      .map((i) => (i > idx ? i - 1 : i));
    setCorrectOption(updatedCorrect);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!promptText.trim()) {
      setErrorMsg("Question prompt text cannot be empty.");
      return;
    }

    if (!isDragDrop) {
      if (options.length < 2) {
        setErrorMsg("Please provide at least 2 answer options.");
        return;
      }
      if (correctOption.length === 0) {
        setErrorMsg("Please mark at least one option as the correct answer.");
        return;
      }
    }

    let parsedDragDrop = null;
    if (isDragDrop && dragDropJson.trim()) {
      try {
        parsedDragDrop = JSON.parse(dragDropJson);
      } catch (err) {
        setErrorMsg("Invalid Drag & Drop JSON format: " + err.message);
        return;
      }
    }

    const payload = {
      id: question.id,
      adminEmail: "candidate@ccna.com",
      questionNo: questionNo.trim(),
      question: promptText.trim(),
      options: isDragDrop ? [] : options.map((opt) => opt.trim()),
      correctOption: isDragDrop ? [] : correctOption,
      points: Number(points) || 10,
      cliSnippet: cliSnippet.trim() ? cliSnippet.trim() : null,
      exhibitImage: exhibitImage.trim() ? exhibitImage.trim() : null,
      originalSourceImage: originalSourceImage.trim() ? originalSourceImage.trim() : null,
      type: isDragDrop ? "drag_drop" : "multiple_choice",
      dragDropData: parsedDragDrop,
    };

    const updatedPayload = {
      ...question,
      ...payload,
    };

    setIsSubmitting(true);

    try {
      const res = await adminFetch(`/api/admin/questions/${question.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update question on server.");
      }

      const serverUpdated = data.question ? { ...updatedPayload, ...data.question } : updatedPayload;

      // Broadcast live update across tabs and active exams
      saveQuestionOverride(serverUpdated);

      setSuccessMsg("Question updated successfully in database! Changes applied in real time.");
      if (onSaveSuccess) {
        onSaveSuccess(serverUpdated);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Question save server error:", err);
      setErrorMsg(err.message || "Failed to update question on server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolveImgUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const clean = path.replace(/^\/+/, "");
    return `/${clean}`;
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose} style={{ zIndex: 100000 }}>
      <div
        className="admin-modal-card edit-question-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "850px",
          width: "95%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          background: "#0d1322",
          border: "1px solid #1e293b",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          color: "#f8fafc",
          overflow: "hidden",
        }}
      >
        {/* MODAL HEADER */}
        <div
          className="admin-modal-header"
          style={{
            padding: "18px 24px",
            background: "#090d16",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>✏️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#ffffff" }}>
                Edit {questionNo || `Question #${question.id}`}
              </h3>
              <span
                style={{
                  fontSize: "11px",
                  color: "#38bdf8",
                  background: "rgba(56, 189, 248, 0.12)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  display: "inline-block",
                  marginTop: "3px",
                }}
              >
                🔒 Admin Privileged Mode • ID: {question.id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="admin-modal-close"
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              fontSize: "20px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
          >
            ✕
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE FORM) */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "20px 24px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {errorMsg && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                color: "#fca5a5",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(34, 197, 94, 0.15)",
                border: "1px solid #22c55e",
                borderRadius: "8px",
                color: "#86efac",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              ✅ {successMsg}
            </div>
          )}

          {uploadFeedback && (
            <div
              style={{
                padding: "10px 16px",
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid #38bdf8",
                borderRadius: "8px",
                color: "#7dd3fc",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              🚀 {uploadFeedback}
            </div>
          )}

          {/* ROW 1: Question No, Points & Type */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 180px", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase" }}>
                Question Number / Label
              </label>
              <input
                type="text"
                className="admin-input"
                value={questionNo}
                onChange={(e) => setQuestionNo(e.target.value)}
                placeholder="e.g. Question #198"
                style={{ width: "100%", background: "#131b2e", border: "1px solid #283548", color: "#fff", padding: "8px 12px", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase" }}>
                Points
              </label>
              <input
                type="number"
                className="admin-input"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                min="1"
                max="100"
                style={{ width: "100%", background: "#131b2e", border: "1px solid #283548", color: "#fff", padding: "8px 12px", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase" }}>
                Question Type
              </label>
              <select
                className="admin-select"
                value={isDragDrop ? "drag_drop" : "multiple_choice"}
                onChange={(e) => setIsDragDrop(e.target.value === "drag_drop")}
                style={{ width: "100%", background: "#131b2e", border: "1px solid #283548", color: "#fff", padding: "8px 12px", borderRadius: "8px", fontSize: "13.5px" }}
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="drag_drop">Drag & Drop</option>
              </select>
            </div>
          </div>

          {/* QUESTION PROMPT TEXT */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase" }}>
              Question Prompt / Stem
            </label>
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Enter the full question prompt text..."
              style={{
                width: "100%",
                background: "#131b2e",
                border: "1px solid #283548",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.5",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* MULTIPLE CHOICE OPTIONS & CORRECT ANSWERS */}
          {!isDragDrop && (
            <div style={{ background: "#090e1a", border: "1px solid #1a2333", borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Options & Correct Answers ({correctOption.length} selected correct)
                  </label>
                  <p style={{ margin: "3px 0 0 0", fontSize: "11.5px", color: "#94a3b8" }}>
                    Click the checkmark pill next to an option to designate it as correct. You can hit <strong>Enter</strong> to split option text into multiple lines.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddOption}
                  style={{
                    background: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    color: "#38bdf8",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ➕ Add Option
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {options.map((opt, idx) => {
                  const isCorrect = correctOption.includes(idx);
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        background: isCorrect ? "rgba(34, 197, 94, 0.08)" : "#111827",
                        border: isCorrect ? "1px solid rgba(34, 197, 94, 0.4)" : "1px solid #1f293d",
                        padding: "8px 12px",
                        borderRadius: "8px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleCorrect(idx)}
                        title={isCorrect ? "Marked as correct (Click to unmark)" : "Click to mark as correct answer"}
                        style={{
                          background: isCorrect ? "#22c55e" : "transparent",
                          border: isCorrect ? "1px solid #22c55e" : "2px solid #64748b",
                          color: isCorrect ? "#fff" : "#64748b",
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: 800,
                          cursor: "pointer",
                          flexShrink: 0,
                          transition: "all 0.15s ease",
                          marginTop: "4px",
                        }}
                      >
                        {isCorrect ? "✓" : ""}
                      </button>

                      <textarea
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        rows={Math.max(1, (opt || "").split("\n").length)}
                        style={{
                          flex: 1,
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          color: isCorrect ? "#86efac" : "#f8fafc",
                          fontSize: "13.5px",
                          fontWeight: isCorrect ? 600 : 400,
                          lineHeight: "1.45",
                          fontFamily: "inherit",
                          resize: "vertical",
                          minHeight: "34px",
                          padding: "4px 0",
                          whiteSpace: "pre-wrap",
                        }}
                      />

                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          title="Delete this option"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "15px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            opacity: 0.7,
                            marginTop: "4px",
                          }}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DRAG & DROP DATA JSON */}
          {isDragDrop && (
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#c084fc", marginBottom: "6px", textTransform: "uppercase" }}>
                🧩 Drag & Drop Interactive Data (JSON)
              </label>
              <textarea
                rows={6}
                value={dragDropJson}
                onChange={(e) => setDragDropJson(e.target.value)}
                placeholder='{\n  "items": ["Item 1", "Item 2"],\n  "targets": ["Target 1", "Target 2"],\n  "correctMatches": { "Target 1": "Item 1" }\n}'
                style={{
                  width: "100%",
                  background: "#131b2e",
                  border: "1px solid #283548",
                  color: "#e2e8f0",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  lineHeight: "1.4",
                }}
              />
            </div>
          )}

          {/* ROW 2: Exhibit Diagram & Original Source Dump */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Exhibit Diagram */}
            <div style={{ background: "#090e1a", border: "1px solid #1a2333", borderRadius: "10px", padding: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#4ade80", textTransform: "uppercase" }}>
                  📸 Exhibit Diagram
                </label>
                {exhibitImage && (
                  <button
                    type="button"
                    onClick={() => setExhibitImage("")}
                    style={{ background: "transparent", border: "none", color: "#f87171", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Hidden File Picker Input for Exhibit */}
              <input
                type="file"
                ref={exhibitFileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageUpload(e.target.files[0], "exhibit");
                    e.target.value = "";
                  }
                }}
              />

              {/* Upload Button + Path Input Bar */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                <button
                  type="button"
                  disabled={isUploadingExhibit}
                  onClick={() => exhibitFileInputRef.current && exhibitFileInputRef.current.click()}
                  style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    border: "1px solid #22c55e",
                    color: "#ffffff",
                    padding: "7px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: isUploadingExhibit ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(22, 163, 74, 0.3)"
                  }}
                  title="Click to browse image from computer or replace existing diagram"
                >
                  {isUploadingExhibit ? (
                    <>
                      <span className="spinner" style={{ width: "12px", height: "12px", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }}></span>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span>📁</span>
                      <span>{exhibitImage ? "Replace Image" : "Upload File"}</span>
                    </>
                  )}
                </button>

                <input
                  type="text"
                  value={exhibitImage}
                  onChange={(e) => setExhibitImage(e.target.value)}
                  placeholder="e.g. exhibits/188.png"
                  style={{ flex: 1, background: "#131b2e", border: "1px solid #283548", color: "#fff", padding: "7px 10px", borderRadius: "6px", fontSize: "12.5px" }}
                  title="Direct image path or URL"
                />
              </div>

              {exhibitImage && (
                <div style={{ marginTop: "10px", textAlign: "center", background: "#050811", borderRadius: "6px", padding: "8px", border: "1px dashed #243048" }}>
                  <img
                    src={resolveImgUrl(exhibitImage)}
                    alt="Exhibit preview"
                    style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain", borderRadius: "4px" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.parentNode) {
                        e.target.parentNode.innerHTML = `<span style="color:#ef4444;font-size:12px;">⚠️ Image not found at path: ${exhibitImage}</span>`;
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* Original Source Dump */}
            <div style={{ background: "#090e1a", border: "1px solid #1a2333", borderRadius: "10px", padding: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase" }}>
                  📄 Original Source Dump
                </label>
                {originalSourceImage && (
                  <button
                    type="button"
                    onClick={() => setOriginalSourceImage("")}
                    style={{ background: "transparent", border: "none", color: "#f87171", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Hidden File Picker Input for Source */}
              <input
                type="file"
                ref={sourceFileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageUpload(e.target.files[0], "original_source");
                    e.target.value = "";
                  }
                }}
              />

              {/* Upload Button + Path Input Bar */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                <button
                  type="button"
                  disabled={isUploadingSource}
                  onClick={() => sourceFileInputRef.current && sourceFileInputRef.current.click()}
                  style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                    border: "1px solid #38bdf8",
                    color: "#ffffff",
                    padding: "7px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: isUploadingSource ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(2, 132, 199, 0.3)"
                  }}
                  title="Click to browse image from computer or replace existing source dump"
                >
                  {isUploadingSource ? (
                    <>
                      <span className="spinner" style={{ width: "12px", height: "12px", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }}></span>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span>📁</span>
                      <span>{originalSourceImage ? "Replace Image" : "Upload File"}</span>
                    </>
                  )}
                </button>

                <input
                  type="text"
                  value={originalSourceImage}
                  onChange={(e) => setOriginalSourceImage(e.target.value)}
                  placeholder="e.g. original_sources/188.webp"
                  style={{ flex: 1, background: "#131b2e", border: "1px solid #283548", color: "#fff", padding: "7px 10px", borderRadius: "6px", fontSize: "12.5px" }}
                  title="Direct image path or URL"
                />
              </div>

              {originalSourceImage && (
                <div style={{ marginTop: "10px", textAlign: "center", background: "#050811", borderRadius: "6px", padding: "8px", border: "1px dashed #243048" }}>
                  <img
                    src={resolveImgUrl(originalSourceImage)}
                    alt="Source preview"
                    style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain", borderRadius: "4px" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.parentNode) {
                        e.target.parentNode.innerHTML = `<span style="color:#ef4444;font-size:12px;">⚠️ Image not found at path: ${originalSourceImage}</span>`;
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* CLI CODE SNIPPET */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
                💻 CLI Snippet / Console Output (Optional)
              </label>
              {cliSnippet && (
                <button
                  type="button"
                  onClick={() => setCliSnippet("")}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
                >
                  Clear Snippet
                </button>
              )}
            </div>
            <textarea
              rows={3}
              value={cliSnippet}
              onChange={(e) => setCliSnippet(e.target.value)}
              placeholder="e.g. Router# show ip route..."
              style={{
                width: "100%",
                background: "#090d16",
                border: "1px solid #283548",
                color: "#38bdf8",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12.5px",
                fontFamily: "monospace",
                lineHeight: "1.4",
              }}
            />
          </div>

          {/* BOTTOM PERSISTENT FEEDBACK BANNER */}
          {errorMsg && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1.5px solid #ef4444",
                borderRadius: "8px",
                color: "#fca5a5",
                fontSize: "13px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "10px"
              }}
            >
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1.5px solid #22c55e",
                borderRadius: "8px",
                color: "#86efac",
                fontSize: "13.5px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.3)",
                marginTop: "10px"
              }}
            >
              <span>✅</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* MODAL ACTIONS FOOTER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "12px",
              paddingTop: "16px",
              borderTop: "1px solid #1e293b",
              marginTop: "8px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#94a3b8",
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || Boolean(successMsg)}
              style={{
                background: successMsg
                  ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                  : "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                border: successMsg ? "1px solid #22c55e" : "1px solid #38bdf8",
                color: "#ffffff",
                padding: "9px 24px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: isSubmitting || successMsg ? "default" : "pointer",
                boxShadow: successMsg
                  ? "0 4px 16px rgba(34, 197, 94, 0.4)"
                  : "0 4px 12px rgba(2, 132, 199, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease"
              }}
            >
              {successMsg ? (
                <>
                  <span>✅</span>
                  <span>Question Saved Successfully!</span>
                </>
              ) : isSubmitting ? (
                <>
                  <span className="spinner" style={{ width: "14px", height: "14px", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }}></span>
                  <span>Saving to MySQL...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Save Question Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuestionModal;
