import React, { useEffect, useRef, useState } from "react";
import QuestionPaletteModal from "./QuestionPaletteModal";

const LAB_PROGRESS_PREFIX = "ccna_lab_progress_";
const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

function getImageList(item, pluralKey, singleKey) {
  const plural = Array.isArray(item?.[pluralKey]) ? item[pluralKey].filter(Boolean) : [];
  if (plural.length > 0) return plural;
  return item?.[singleKey] ? [item[singleKey]] : [];
}

function LabVisibilityIcon({ isBlurred }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {isBlurred ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18.5 18.5 0 0 1-3.1 3.8" />
          <path d="M6.2 6.3C3.5 8.2 2 12 2 12s3.5 7 10 7a9.9 9.9 0 0 0 3.1-.5" />
        </>
      ) : (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

function LabImage({ src, alt, className = "", style, allowBlur = false, imageLabel = "image", ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsBlurred(false);
  }, [src]);

  return (
    <div className={`lab-image-loader ${isLoading ? "is-loading" : ""} ${hasError ? "has-error" : ""}`}>
      {isLoading && (
        <div className="lab-image-loading-indicator" role="status" aria-label="Loading image">
          <span className="lab-image-spinner" aria-hidden="true" />
          <span>Loading image…</span>
        </div>
      )}
      {hasError && <div className="lab-image-error">Image unavailable</div>}
      {allowBlur && !isLoading && !hasError && (
        <button
          type="button"
          className={`lab-image-visibility-button ${isBlurred ? "is-blurred" : ""}`}
          onClick={() => setIsBlurred((previous) => !previous)}
          aria-pressed={isBlurred}
          aria-label={isBlurred ? `Show ${imageLabel}` : `Blur ${imageLabel}`}
          title={isBlurred ? `Show ${imageLabel}` : `Blur ${imageLabel}`}
        >
          <LabVisibilityIcon isBlurred={isBlurred} />
        </button>
      )}
      <img
        {...props}
        src={src}
        alt={alt}
        className={`${className} ${isBlurred ? "is-blurred" : ""}`.trim()}
        style={style}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}

function LabZoomableImage({ src, alt, imageLabel = "task image", allowBlur = false }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    dragRef.current = null;
  }, [src]);

  useEffect(() => {
    if (zoom <= 1) {
      setPan({ x: 0, y: 0 });
      setIsDragging(false);
      dragRef.current = null;
    }
  }, [zoom]);

  const clampPan = (x, y, width, height) => {
    const maxX = Math.max(0, (width * (zoom - 1)) / 2);
    const maxY = Math.max(0, (height * (zoom - 1)) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handlePointerDown = (event) => {
    if (zoom <= 1 || event.button !== 0 || event.target?.closest?.("button")) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const bounds = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: pan,
      width: bounds.width,
      height: bounds.height,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    setPan(clampPan(
      drag.origin.x + event.clientX - drag.startX,
      drag.origin.y + event.clientY - drag.startY,
      drag.width,
      drag.height,
    ));
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
  };

  const changeZoom = (delta) => {
    setZoom((currentZoom) => Math.min(3, Math.max(1, Number((currentZoom + delta).toFixed(2)))));
  };

  return (
    <div
      className={`lab-task-zoom-viewer ${zoom > 1 ? "is-zoomed" : ""} ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      aria-label={`${alt}. Zoom in, then drag to inspect it.`}
    >
      <div className="lab-task-zoom-controls" aria-label={`${imageLabel} zoom controls`}>
        <button type="button" onClick={() => changeZoom(-0.25)} disabled={zoom <= 1} aria-label={`Zoom ${imageLabel} out`} title="Zoom out">−</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => changeZoom(0.25)} disabled={zoom >= 3} aria-label={`Zoom ${imageLabel} in`} title="Zoom in">+</button>
      </div>
      <div
        className="lab-task-zoom-canvas"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <LabImage src={src} alt={alt} allowBlur={allowBlur} imageLabel={imageLabel} />
      </div>
    </div>
  );
}

function getCandidateInitials(name) {
  if (!name || !name.trim()) return "CC";
  const parts = name.trim().split(/\s+/);
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function readSavedProgress(sessionId, questionId) {
  if (!sessionId || !questionId) return null;
  try {
    const raw = localStorage.getItem(`${LAB_PROGRESS_PREFIX}${sessionId}_${questionId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function LabSolutionSlice({ sourceImage, sourceWidth, sourceHeight, slice, allowBlur = false }) {
  if (!slice) return null;

  const imageWidth = `${(sourceWidth / slice.width) * 100}%`;
  const translateX = `${(slice.x / sourceWidth) * -100}%`;
  const translateY = `${(slice.y / sourceHeight) * -100}%`;

  return (
    <div
      className="lab-solution-slice"
      style={{ aspectRatio: `${slice.width} / ${slice.height}` }}
    >
      <LabImage
        src={sourceImage}
        alt="Revealed lab solution"
        className="lab-solution-slice-image"
        allowBlur={allowBlur}
        imageLabel="solution image"
        style={{
          width: imageWidth,
          maxWidth: "none",
          transform: `translate(${translateX}, ${translateY})`,
        }}
      />
    </div>
  );
}

function LabSolution({ task, fallbackImage, fallbackWidth, fallbackHeight, allowBlur = false }) {
  const solutionImages = getImageList(task, "solutionImages", "solutionImage");
  const renderedImages = solutionImages.length > 0 ? solutionImages : (fallbackImage ? [fallbackImage] : []);
  const solutionWidth = task?.solutionWidth || fallbackWidth;
  const solutionHeight = task?.solutionHeight || fallbackHeight;
  const hasWrittenCommands = Boolean(task?.commandText?.trim());

  if (renderedImages.length === 0 && !hasWrittenCommands) return null;

  return (
    <div className="lab-solution-content">
      {hasWrittenCommands && (
        <pre className="lab-solution-command" aria-label="Written command solution">
          {task.commandText}
        </pre>
      )}
      {renderedImages.length > 0 && (
        <div className="lab-solution-image-wrap lab-contiguous-image-strip">
          {renderedImages.map((image, imageIndex) => (
            task.solutionSlice && imageIndex === 0 ? (
              <LabSolutionSlice
                key={`${image}-${imageIndex}`}
                sourceImage={image}
                sourceWidth={solutionWidth}
                sourceHeight={solutionHeight}
                slice={task.solutionSlice}
                allowBlur={allowBlur}
              />
            ) : (
              <LabImage
                key={`${image}-${imageIndex}`}
                src={image}
                alt={`Revealed lab solution ${imageIndex + 1}`}
                allowBlur={allowBlur}
                imageLabel={`solution image ${imageIndex + 1}`}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
}

const IOS_COMMANDS = {
  user: ["enable", "show version", "show running-config", "show ip interface brief", "show vlan brief", "show interfaces", "show cdp neighbors", "show lldp neighbors", "ping", "traceroute", "telnet", "ssh", "?"],
  privileged: ["configure terminal", "conf t", "show version", "show running-config", "show ip interface brief", "show vlan brief", "show interfaces", "show interfaces trunk", "show etherchannel summary", "show cdp neighbors", "show lldp neighbors", "show ntp associations", "interface", "interface GigabitEthernet0/0", "interface GigabitEthernet0/1", "interface range GigabitEthernet0/1 - 2", "vlan", "router ospf", "router eigrp", "ip route", "ipv6 route", "write memory", "copy running-config startup-config", "reload", "terminal length 0", "clear", "disable", "exit", "?"],
  config: ["hostname", "enable secret", "enable password", "service password-encryption", "service timestamps", "username", "banner motd", "line console 0", "line vty 0 4", "password", "login", "login local", "interface", "interface GigabitEthernet0/0", "interface GigabitEthernet0/1", "interface range GigabitEthernet0/1 - 2", "vlan", "router ospf", "router eigrp", "router rip", "ip routing", "ipv6 unicast-routing", "ip route", "ipv6 route", "ip domain-name", "ip name-server", "crypto key generate rsa", "ntp server", "ntp master", "no", "do", "exit", "end", "?"],
  interface: ["description", "ip address", "ipv6 address", "no shutdown", "shutdown", "switchport mode access", "switchport mode trunk", "switchport access vlan", "switchport trunk allowed vlan", "switchport trunk native vlan", "switchport nonegotiate", "switchport port-security", "channel-group", "channel-protocol lacp", "channel-protocol pagp", "spanning-tree portfast", "spanning-tree bpduguard enable", "spanning-tree vlan", "cdp enable", "no cdp enable", "cdp run", "lldp transmit", "lldp receive", "no lldp transmit", "no lldp receive", "ip ospf", "ip ospf network", "ip helper-address", "standby", "encapsulation dot1q", "clock rate", "bandwidth", "mtu", "delay", "no", "do", "exit", "end", "?"],
  "interface-range": ["description", "ip address", "ipv6 address", "no shutdown", "shutdown", "switchport mode access", "switchport mode trunk", "switchport access vlan", "switchport trunk allowed vlan", "switchport trunk native vlan", "switchport nonegotiate", "switchport port-security", "channel-group", "channel-protocol lacp", "channel-protocol pagp", "spanning-tree portfast", "spanning-tree bpduguard enable", "spanning-tree vlan", "cdp enable", "no cdp enable", "cdp run", "lldp transmit", "lldp receive", "no lldp transmit", "no lldp receive", "ip ospf", "ip ospf network", "ip helper-address", "standby", "encapsulation dot1q", "clock rate", "bandwidth", "mtu", "delay", "no", "do", "exit", "end", "?"],
  vlan: ["name", "state active", "state suspend", "remote-span", "private-vlan", "exit", "end", "?"],
  router: ["router-id", "network", "passive-interface", "default-information originate", "redistribute", "area", "distance", "maximum-paths", "auto-summary", "version 2", "no auto-summary", "exit", "end", "?"],
};

function createCiscoCliState(hostname = "Switch") {
  return {
    hostname,
    mode: "user",
    input: "",
    commandHistory: [],
    historyCursor: -1,
    transcript: [],
    configLines: [],
  };
}

function getCiscoPrompt(cli) {
  const suffix = {
    config: "(config)",
    interface: "(config-if)",
    "interface-range": "(config-if-range)",
    vlan: "(config-vlan)",
    router: "(config-router)",
  }[cli.mode] || "";
  return `${cli.hostname}${suffix}${cli.mode === "user" ? ">" : "#"}`;
}

function getCiscoCompletions(cli, input = "") {
  const normalized = input.trimStart().toLowerCase();
  const candidates = IOS_COMMANDS[cli.mode] || IOS_COMMANDS.interface;
  return candidates.filter((command) => command.toLowerCase().startsWith(normalized));
}

function getCiscoShowOutput(cli, command) {
  const normalized = command.toLowerCase();
  if (normalized === "show running-config" || normalized === "show run") {
    return [
      "Building configuration...",
      "",
      "Current configuration : 1 bytes",
      "!",
      ...cli.configLines,
      "!",
      "end",
    ];
  }
  if (normalized.includes("ip interface brief")) {
    return [
      "Interface              IP-Address      OK? Method Status                Protocol",
      "GigabitEthernet0/0     unassigned      YES unset  administratively down down",
      "GigabitEthernet0/1     unassigned      YES unset  administratively down down",
    ];
  }
  if (normalized.includes("vlan brief")) {
    return [
      "VLAN Name                             Status    Ports",
      "---- -------------------------------- --------- -------------------------------",
      "1    default                          active",
    ];
  }
  if (normalized.includes("version")) {
    return [`Cisco IOS Software, ${cli.hostname} practice simulator`, "Compiled for CCNA lab command practice"];
  }
  if (normalized.includes("cdp neighbors") || normalized.includes("lldp neighbors")) {
    return [
      "Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID",
      "R1               Gig 0/1          145        R           ISR       Gig 0/0",
    ];
  }
  if (normalized.includes("etherchannel summary")) {
    return ["Group  Port-channel  Protocol    Ports", "------+-------------+-----------+--------------------------", "1      Po1(SU)       LACP        Gi0/1(P) Gi0/2(P)"];
  }
  if (normalized.includes("ntp associations")) {
    return ["     address         ref clock     st   when   poll reach  delay  offset", "*~192.0.2.1       127.127.1.1     2      8     64   377   0.000   0.000"];
  }
  if (normalized === "show" || normalized === "show ?") {
    return ["  running-config       Current operating configuration", "  interfaces           Interface status and configuration", "  ip interface brief   Interface IP status", "  vlan brief           VLAN information", "  version              System information"];
  }
  return ["% Command accepted in the IOS practice simulator."];
}

function runCiscoCliCommand(cli, rawCommand) {
  const command = rawCommand.trim();
  const prompt = getCiscoPrompt(cli);
  const lower = command.toLowerCase().replace(/\s+/g, " ");
  let nextMode = cli.mode;
  let nextHostname = cli.hostname;
  let output = [];
  let configLines = cli.configLines;
  const commandAliases = {
    en: "enable",
    ena: "enable",
    ex: "exit",
    exi: "exit",
    "sh run": "show running-config",
    "sh ip int br": "show ip interface brief",
    "sh vlan br": "show vlan brief",
    "sh ver": "show version",
  };
  const canonicalCommand = commandAliases[lower] || lower;
  const showCommand = canonicalCommand.startsWith("do ") ? canonicalCommand.slice(3).trim() : canonicalCommand;

  if ((canonicalCommand === "enable") && cli.mode === "user") {
    nextMode = "privileged";
  } else if ((canonicalCommand === "disable" || canonicalCommand === "exit") && cli.mode === "privileged") {
    nextMode = "user";
  } else if ((canonicalCommand === "configure terminal" || canonicalCommand === "configure t" || canonicalCommand === "conf t") && cli.mode === "privileged") {
    nextMode = "config";
  } else if (canonicalCommand === "end") {
    nextMode = cli.mode === "user" ? "user" : "privileged";
  } else if (canonicalCommand === "exit") {
    nextMode = cli.mode === "config" ? "privileged" : cli.mode === "user" ? "user" : "config";
  } else if (/^(interface|int)\s+range\s+\S+/.test(lower) && cli.mode === "config") {
    nextMode = "interface-range";
    configLines = [...configLines, command];
  } else if (/^(interface|int)\s+\S+/.test(lower) && cli.mode === "config") {
    nextMode = "interface";
    configLines = [...configLines, command];
  } else if (/^vlan\s+\S+/.test(lower) && cli.mode === "config") {
    nextMode = "vlan";
    configLines = [...configLines, command];
  } else if (/^router\s+/.test(lower) && cli.mode === "config") {
    nextMode = "router";
    configLines = [...configLines, command];
  } else if (/^hostname\s+\S+/.test(lower) && cli.mode === "config") {
    nextHostname = command.split(/\s+/).slice(1).join(" ") || cli.hostname;
    configLines = [...configLines, command];
  } else if (/^name\s+\S+/.test(canonicalCommand) && cli.mode === "vlan") {
    configLines = [...configLines, command];
  } else if (showCommand.startsWith("show ") || showCommand === "show") {
    output = getCiscoShowOutput(cli, showCommand);
  } else if (lower === "?" || lower.endsWith(" ?")) {
    output = (IOS_COMMANDS[cli.mode] || IOS_COMMANDS.user).map((item) => `  ${item}`);
  } else if (lower === "write memory" || lower === "wr" || lower === "copy running-config startup-config") {
    output = ["Building configuration...", "[OK]"];
  } else if (/^(do\s+)?(no\s+|ip\s+|ipv6\s+|switchport\s+|spanning-tree\s+|channel-(group|protocol)\s+|description\s+|shutdown$|no shutdown$|network\s+|router-id\s+|passive-interface\s+|default-information originate|service\s+|enable\s+(secret|password)\s+|username\s+|banner\s+|line\s+|password\s+|login(\s+|$)|ntp\s+|cdp(\s+|$)|lldp\s+|standby\s+|encapsulation\s+|clock rate\s+|bandwidth\s+|mtu\s+|delay\s+|crypto\s+)/.test(lower)) {
    configLines = cli.mode === "config" || cli.mode === "interface" || cli.mode === "interface-range" || cli.mode === "vlan" || cli.mode === "router"
      ? [...configLines, command]
      : configLines;
  } else if (lower === "terminal length 0" || lower === "clear") {
    output = lower === "clear" ? [] : output;
  } else if (command) {
    configLines = cli.mode === "config" || cli.mode === "interface" || cli.mode === "interface-range" || cli.mode === "vlan" || cli.mode === "router"
      ? [...configLines, command]
      : configLines;
  }

  return {
    ...cli,
    hostname: nextHostname,
    mode: nextMode,
    input: "",
    historyCursor: -1,
    commandHistory: command ? [...cli.commandHistory, command].slice(-50) : cli.commandHistory,
    configLines,
    transcript: [...cli.transcript, { prompt, command, output }].slice(-100),
  };
}

function createFullscreenNote(index = 0, text = "") {
  return {
    id: `lab-note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: `Note ${index + 1}`,
    text,
    mode: "cli",
    cli: createCiscoCliState(),
    cliFontSize: 1.8,
    cliLayoutVersion: 2,
    x: 24 + (index % 4) * 28,
    y: 24 + (index % 4) * 28,
    zIndex: 60 + index,
    isOpen: true,
  };
}

function getCliFontSize(note) {
  return Math.min(2.4, Math.max(0.8, Number(note?.cliFontSize) || 1.8));
}

function normalizeFullscreenNotes(rawNotes) {
  if (!Array.isArray(rawNotes)) return [];
  return rawNotes.map((note, index) => {
    const savedNote = typeof note === "object" && note ? note : {};
    const isLegacyCliNote = (savedNote.mode || "cli") === "cli" && savedNote.cliLayoutVersion !== 2;
    return {
      ...createFullscreenNote(index, typeof note === "string" ? note : note?.text || ""),
      ...savedNote,
      ...(isLegacyCliNote ? { width: undefined, height: undefined } : {}),
      id: savedNote.id || createFullscreenNote(index).id,
      zIndex: Number(savedNote.zIndex) || 60 + index,
      cliFontSize: getCliFontSize(note),
      cliLayoutVersion: 2,
    };
  });
}

function LabFullscreenScratchNotes({ notes, onNotesChange, onSave, isOpen, onClose }) {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [editingCliLine, setEditingCliLine] = useState(null);

  const getNoteCli = (note) => note?.cli || createCiscoCliState();
  const activeNote = notes.find((note) => note.id === activeNoteId) || notes[0] || null;

  useEffect(() => {
    if (activeNote && activeNote.id !== activeNoteId) setActiveNoteId(activeNote.id);
    if (!activeNote && activeNoteId) setActiveNoteId(null);
  }, [activeNote, activeNoteId]);

  const addNote = (mode = "cli") => {
    const nextNote = {
      ...createFullscreenNote(notes.length),
      mode,
      title: mode === "cli" ? `Switch ${notes.length + 1}` : `Note ${notes.length + 1}`,
    };
    const next = [...notes, nextNote];
    setActiveNoteId(nextNote.id);
    onNotesChange(next);
    onSave(next);
  };

  const updateNote = (noteId, changes, shouldSave = false) => {
    const next = notes.map((note) => (note.id === noteId ? { ...note, ...changes } : note));
    onNotesChange(next);
    if (shouldSave) onSave(next);
  };

  const renameNote = (note, title) => {
    const changes = { title };
    if (note.mode === "cli") changes.cli = { ...getNoteCli(note), hostname: title.trim() || "Switch" };
    updateNote(note.id, changes, true);
  };

  const deleteNote = (noteId) => {
    const next = notes.filter((note) => note.id !== noteId);
    onNotesChange(next);
    onSave(next);
    setActiveNoteId(next[0]?.id || null);
  };

  const toggleNoteMode = (note) => {
    updateNote(note.id, note.mode === "cli" ? { mode: "note" } : { mode: "cli", cli: getNoteCli(note) }, true);
  };

  const startEditingCliLine = (note, entryIndex, command) => {
    setEditingCliLine({ noteId: note.id, entryIndex, value: command });
  };

  const saveEditedCliLine = (note) => {
    if (!editingCliLine || editingCliLine.noteId !== note.id) return;
    const cli = getNoteCli(note);
    const transcript = cli.transcript.map((entry, entryIndex) => (
      entryIndex === editingCliLine.entryIndex ? { ...entry, command: editingCliLine.value } : entry
    ));
    const commandHistory = cli.commandHistory.map((command, commandIndex) => (
      commandIndex === editingCliLine.entryIndex ? editingCliLine.value : command
    ));
    updateNote(note.id, { cli: { ...cli, transcript, commandHistory } }, true);
    setEditingCliLine(null);
  };

  const deleteCliLine = (note, entryIndex) => {
    const cli = getNoteCli(note);
    const deletedCommand = cli.transcript[entryIndex]?.command;
    const transcript = cli.transcript.filter((_, index) => index !== entryIndex);
    const commandHistory = deletedCommand
      ? cli.commandHistory.filter((command, index) => !(index === entryIndex && command === deletedCommand))
      : cli.commandHistory;
    updateNote(note.id, { cli: { ...cli, transcript, commandHistory } }, true);
    setEditingCliLine(null);
  };

  const adjustCliFontSize = (note, delta) => {
    const currentSize = getCliFontSize(note);
    const nextSize = Math.min(2.4, Math.max(0.8, Number((currentSize + delta).toFixed(2))));
    updateNote(note.id, { cliFontSize: nextSize }, true);
  };

  const completeCliInput = (note) => {
    const cli = getNoteCli(note);
    const matches = getCiscoCompletions(cli, cli.input);
    if (matches.length === 0) return;
    const commonPrefix = matches.slice(1).reduce((prefix, candidate) => {
      let length = 0;
      while (length < prefix.length && length < candidate.length && prefix[length].toLowerCase() === candidate[length].toLowerCase()) length += 1;
      return prefix.slice(0, length);
    }, matches[0]);
    const completedInput = matches.length === 1 ? matches[0] : commonPrefix;
    if (completedInput.length > cli.input.length) updateNote(note.id, { cli: { ...cli, input: completedInput } });
  };

  const handleCliKeyDown = (event, note) => {
    const cli = getNoteCli(note);
    if (event.key === "Tab") {
      event.preventDefault();
      completeCliInput(note);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      if (cli.commandHistory.length === 0) return;
      const nextCursor = event.key === "ArrowUp"
        ? Math.min(cli.commandHistory.length - 1, cli.historyCursor < 0 ? cli.commandHistory.length - 1 : cli.historyCursor + 1)
        : Math.max(-1, cli.historyCursor - 1);
      updateNote(note.id, { cli: { ...cli, historyCursor: nextCursor, input: nextCursor < 0 ? "" : cli.commandHistory[nextCursor] } });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const nextCli = runCiscoCliCommand(cli, cli.input);
      updateNote(note.id, { cli: nextCli, ...(nextCli.hostname !== cli.hostname ? { title: nextCli.hostname } : {}) }, true);
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      updateNote(note.id, { cli: { ...cli, input: "", historyCursor: -1, transcript: [...cli.transcript, { prompt: getCiscoPrompt(cli), command: cli.input, output: ["^C"] }].slice(-100) } }, true);
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      updateNote(note.id, { cli: { ...cli, transcript: [] } }, true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="lab-scratch-workspace" role="dialog" aria-modal="false" aria-label="CLI and notes workspace">
      <div className="lab-scratch-workspace-header">
        <div>
          <span className="lab-scratch-workspace-eyebrow">Workspace</span>
          <h2>CLI / Note</h2>
        </div>
        <div className="lab-scratch-workspace-header-actions">
          <button type="button" onClick={() => addNote("cli")}>+ CLI</button>
          <button type="button" onClick={() => addNote("note")}>+ Note</button>
          <button type="button" className="lab-scratch-workspace-close" onClick={() => { onSave(notes); onClose(); }} aria-label="Close CLI and Note workspace">×</button>
        </div>
      </div>

      <div className="lab-scratch-tabs" role="tablist" aria-label="CLI and note tabs">
        {notes.map((note, noteIndex) => (
          <button
            key={note.id}
            type="button"
            role="tab"
            aria-selected={activeNote?.id === note.id}
            className={`lab-scratch-tab ${activeNote?.id === note.id ? "is-active" : ""}`}
            onClick={() => {
              setActiveNoteId(note.id);
              setEditingCliLine(null);
            }}
          >
            <span className="lab-scratch-tab-kind">{note.mode === "cli" ? "CLI" : "NOTE"}</span>
            <span>{note.title || `${note.mode === "cli" ? "Switch" : "Note"} ${noteIndex + 1}`}</span>
          </button>
        ))}
        {notes.length === 0 && <span className="lab-scratch-tabs-empty">Add a CLI or note tab to begin.</span>}
      </div>

      {activeNote && (
        <section className="lab-scratch-active-panel" key={activeNote.id}>
          <div className="lab-scratch-active-header">
            <input
              className="lab-scratch-title-input"
              value={activeNote.title ?? ""}
              onChange={(event) => renameNote(activeNote, event.target.value)}
              placeholder={activeNote.mode === "cli" ? "Device name" : "Note title"}
              aria-label="Rename current CLI or note tab"
            />
            <button type="button" className="lab-scratch-mode-button" onClick={() => toggleNoteMode(activeNote)}>
              {activeNote.mode === "cli" ? "Switch to Note" : "Switch to CLI"}
            </button>
          </div>

          {activeNote.mode === "cli" ? (
            <div className="lab-fullscreen-ios-terminal lab-scratch-terminal" style={{ fontSize: `${getCliFontSize(activeNote)}rem` }}>
              <div className="lab-fullscreen-ios-output" aria-live="polite">
                {getNoteCli(activeNote).transcript.map((entry, entryIndex) => (
                  <div key={`${activeNote.id}-entry-${entryIndex}`} className="lab-fullscreen-ios-entry">
                    <div className="lab-fullscreen-ios-command-line">
                      <span><span className="lab-fullscreen-ios-prompt">{entry.prompt}</span> </span>
                      {editingCliLine?.noteId === activeNote.id && editingCliLine.entryIndex === entryIndex ? (
                        <input
                          className="lab-fullscreen-ios-line-editor"
                          value={editingCliLine.value}
                          onChange={(event) => setEditingCliLine((current) => ({ ...current, value: event.target.value }))}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") { event.preventDefault(); saveEditedCliLine(activeNote); }
                            if (event.key === "Escape") { event.preventDefault(); setEditingCliLine(null); }
                          }}
                          autoFocus
                          aria-label={`Edit command line ${entryIndex + 1}`}
                        />
                      ) : <span className="lab-fullscreen-ios-command-text">{entry.command}</span>}
                      <span className="lab-fullscreen-ios-line-actions">
                        {editingCliLine?.noteId === activeNote.id && editingCliLine.entryIndex === entryIndex ? (
                          <button type="button" onClick={() => saveEditedCliLine(activeNote)}>Save</button>
                        ) : (
                          <>
                            <button type="button" onClick={() => startEditingCliLine(activeNote, entryIndex, entry.command)}>Edit</button>
                            <button type="button" onClick={() => deleteCliLine(activeNote, entryIndex)} aria-label={`Remove command line ${entryIndex + 1}`}>×</button>
                          </>
                        )}
                      </span>
                    </div>
                    {entry.output.map((line, lineIndex) => <div key={`${activeNote.id}-entry-${entryIndex}-line-${lineIndex}`} className="lab-fullscreen-ios-output-line">{line || " "}</div>)}
                  </div>
                ))}
              </div>
              <div className="lab-fullscreen-ios-input-row">
                <span className="lab-fullscreen-ios-prompt">{getCiscoPrompt(getNoteCli(activeNote))}</span>
                <input
                  value={getNoteCli(activeNote).input}
                  onChange={(event) => updateNote(activeNote.id, { cli: { ...getNoteCli(activeNote), input: event.target.value } })}
                  onKeyDown={(event) => handleCliKeyDown(event, activeNote)}
                  aria-label="Cisco IOS command input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          ) : (
            <textarea
              className="lab-scratch-textarea"
              value={activeNote.text || ""}
              onChange={(event) => updateNote(activeNote.id, { text: event.target.value }, true)}
              placeholder="Write your answer or working here…"
              aria-label="Scratch note text"
            />
          )}

          <div className="lab-scratch-workspace-footer">
            {activeNote.mode === "cli" ? (
              <div className="lab-fullscreen-ios-font-controls" aria-label="CLI font size controls">
                <button type="button" onClick={() => adjustCliFontSize(activeNote, -0.1)} disabled={getCliFontSize(activeNote) <= 0.8} aria-label="Decrease CLI font size">A−</button>
                <span>{Math.round(getCliFontSize(activeNote) * 100)}%</span>
                <button type="button" onClick={() => adjustCliFontSize(activeNote, 0.1)} disabled={getCliFontSize(activeNote) >= 2.4} aria-label="Increase CLI font size">A+</button>
                <span className="lab-fullscreen-ios-help">Tab complete · ↑↓ history · Ctrl+L clear</span>
              </div>
            ) : <span>Text note</span>}
            <div className="lab-scratch-footer-actions">
              <button type="button" className="lab-fullscreen-scratch-note-delete" onClick={() => deleteNote(activeNote.id)}>Delete tab</button>
              <button type="button" onClick={() => { onSave(notes); onClose(); }}>Save & Close</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function LabFullscreenWorkspace({
  question,
  seqNumber,
  tasks,
  revealedTasks,
  labNumber,
  labItemLabel,
  sourceWidth,
  sourceHeight,
  sourceParts,
  topologyParts,
  revealTask,
  onGoToQuestion,
  canGoPrevious,
  canGoNext,
  isNavSaving,
  rating,
  onChooseRating,
  onOpenScratchWorkspace,
}) {
  const taskReferenceParts = sourceParts.filter((part) => !/topology/i.test(`${part.id || ""} ${part.alt || ""}`));
  const [topologyZoom, setTopologyZoom] = useState(1);
  const [topologyPan, setTopologyPan] = useState({ x: 0, y: 0 });
  const [isTopologyDragging, setIsTopologyDragging] = useState(false);
  const [solutionsBlurred, setSolutionsBlurred] = useState(false);
  const topologyDragRef = useRef(null);
  const allSolutionsRevealed = tasks.length > 0 && revealedTasks.length >= tasks.length;

  useEffect(() => {
    setTopologyZoom(1);
    setTopologyPan({ x: 0, y: 0 });
    setIsTopologyDragging(false);
    topologyDragRef.current = null;
    setSolutionsBlurred(false);
  }, [question?.id]);

  useEffect(() => {
    if (topologyZoom <= 1) {
      setTopologyPan({ x: 0, y: 0 });
      setIsTopologyDragging(false);
      topologyDragRef.current = null;
    }
  }, [topologyZoom]);

  const topologyZoomStyle = {
    transform: `translate(${topologyPan.x}px, ${topologyPan.y}px) scale(${topologyZoom})`,
    transformOrigin: "center center",
  };

  const clampTopologyPan = (x, y, width, height) => {
    const maxX = Math.max(0, (width * (topologyZoom - 1)) / 2);
    const maxY = Math.max(0, (height * (topologyZoom - 1)) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleTopologyPointerDown = (event) => {
    if (topologyZoom <= 1 || event.button !== 0 || event.target?.closest?.("button")) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const bounds = event.currentTarget.getBoundingClientRect();
    topologyDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: topologyPan,
      width: bounds.width,
      height: bounds.height,
    };
    setIsTopologyDragging(true);
  };

  const handleTopologyPointerMove = (event) => {
    const drag = topologyDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    setTopologyPan(clampTopologyPan(
      drag.origin.x + event.clientX - drag.startX,
      drag.origin.y + event.clientY - drag.startY,
      drag.width,
      drag.height,
    ));
  };

  const handleTopologyPointerUp = (event) => {
    const drag = topologyDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    topologyDragRef.current = null;
    setIsTopologyDragging(false);
  };

  const goToLab = (targetIndex) => {
    if (isNavSaving || !onGoToQuestion) return;
    onGoToQuestion(targetIndex);
  };

  return (
    <div className="lab-fullscreen-layout">
      <button
        type="button"
        className="lab-fullscreen-nav lab-fullscreen-nav-prev"
        onClick={() => goToLab(seqNumber - 2)}
        disabled={!canGoPrevious || isNavSaving}
        aria-label="Open previous lab"
        title="Previous lab"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className="lab-fullscreen-nav lab-fullscreen-nav-next"
        onClick={() => goToLab(seqNumber)}
        disabled={!canGoNext || isNavSaving}
        aria-label="Open next lab"
        title="Next lab"
      >
        <span aria-hidden="true">›</span>
      </button>
      <aside className="lab-fullscreen-left" aria-label="Topology and task details">
        <div className="lab-fullscreen-task-section">
          {taskReferenceParts.length > 0 && (
            <div className="lab-fullscreen-reference-images" aria-label="Original task references">
              {taskReferenceParts.map((part) => (
                <LabZoomableImage
                  key={part.id || part.src}
                  src={part.src}
                  alt={part.alt || "Original task reference"}
                  imageLabel="task reference"
                  allowBlur
                />
              ))}
            </div>
          )}

          <div className="lab-fullscreen-task-heading">
            <span>Tasks</span>
            <strong>{labItemLabel}</strong>
          </div>
          <div className="lab-fullscreen-task-list">
            {tasks.map((task, taskIndex) => {
              const isRevealed = revealedTasks.includes(taskIndex);
              const isAvailable = taskIndex <= revealedTasks.length;
              const taskImages = getImageList(task, "taskImages", "taskImage");
              return (
                <article key={task.id || taskIndex} className={`lab-fullscreen-task ${isRevealed ? "is-revealed" : ""} ${!isAvailable ? "is-locked" : ""}`}>
                  <button
                    type="button"
                    className="lab-task-toggle"
                    onClick={() => revealTask(taskIndex)}
                    disabled={!isAvailable || isRevealed}
                    aria-expanded={isRevealed}
                  >
                    <span className="lab-task-number">{taskIndex + 1}</span>
                    <span className="lab-task-copy"><strong>{task.label}</strong></span>
                    <span className="lab-task-chevron" aria-hidden="true">{isRevealed ? "✓" : isAvailable ? "→" : "•"}</span>
                  </button>
                  {task.text && <div className="lab-task-prompt">{task.text}</div>}
                  {task.taskText && <pre className="lab-task-written-content">{task.taskText}</pre>}
                  {taskImages.length > 0 && (
                    <div className="lab-task-image-wrap lab-contiguous-image-strip">
                      {taskImages.map((image, imageIndex) => (
                        <LabZoomableImage
                          key={`${image}-${imageIndex}`}
                          src={image}
                          alt={`Reference ${imageIndex + 1} for ${task.label}`}
                          imageLabel={`task image ${imageIndex + 1}`}
                          allowBlur
                        />
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className="lab-fullscreen-topology-section">
          <div className="lab-fullscreen-topology-heading">
            <span className="lab-section-caption">Lab No</span>
            <strong>{labNumber}</strong>
            <span className="lab-section-subtitle">Topology</span>
            <div className="lab-topology-zoom-controls" aria-label="Topology zoom controls">
              <button
                type="button"
                onClick={() => setTopologyZoom((zoom) => Math.max(1, Number((zoom - 0.25).toFixed(2))))}
                disabled={topologyZoom <= 1}
                aria-label="Zoom topology out"
                title="Zoom topology out"
              >−</button>
              <span>{Math.round(topologyZoom * 100)}%</span>
              <button
                type="button"
                onClick={() => setTopologyZoom((zoom) => Math.min(3, Number((zoom + 0.25).toFixed(2))))}
                disabled={topologyZoom >= 3}
                aria-label="Zoom topology in"
                title="Zoom topology in"
              >+</button>
            </div>
          </div>
          <div
            className={`lab-fullscreen-topology-image ${topologyZoom > 1 ? "is-zoomed" : ""} ${isTopologyDragging ? "is-dragging" : ""}`}
            onPointerDown={handleTopologyPointerDown}
            onPointerMove={handleTopologyPointerMove}
            onPointerUp={handleTopologyPointerUp}
            onPointerCancel={handleTopologyPointerUp}
            onLostPointerCapture={handleTopologyPointerUp}
            aria-label="Topology image. Zoom in, then drag to inspect it."
          >
            {sourceParts.length > 0 ? (
              <div className="lab-source-parts" style={topologyZoomStyle}>
                {(topologyParts.length > 0 ? topologyParts : sourceParts).map((part) => (
                  <LabImage
                    key={part.id || part.src}
                    src={part.src}
                    alt={part.alt || "Original lab topology"}
                    allowBlur
                    imageLabel="topology image"
                  />
                ))}
              </div>
            ) : (
              <div
                className="lab-source-frame lab-source-complete lab-fullscreen-complete-topology"
                style={topologyZoomStyle}
              >
                <LabImage
                  src={question?.sourceImage}
                  alt="Lab topology"
                  allowBlur
                  imageLabel="topology image"
                  style={{ width: "100%", maxWidth: "100%" }}
                />
              </div>
            )}
          </div>
        </div>
      </aside>

      <section className="lab-fullscreen-right" aria-label="Lab solutions">
        <div className="lab-fullscreen-solution-heading">
          <span>Solution</span>
          <div className="lab-solution-heading-actions">
            <strong>{Math.min(revealedTasks.length, tasks.length)} / {tasks.length} revealed</strong>
            <button
              type="button"
              className="lab-solution-visibility-button"
              onClick={() => setSolutionsBlurred((previous) => !previous)}
              aria-pressed={solutionsBlurred}
              aria-label={solutionsBlurred ? "Show all solution images" : "Blur all solution images"}
              title={solutionsBlurred ? "Show all solution images" : "Blur all solution images"}
            >
              <LabVisibilityIcon isBlurred={solutionsBlurred} />
            </button>
          </div>
        </div>
        <div className={`lab-fullscreen-solution-scroll ${solutionsBlurred ? "solutions-are-blurred" : ""}`}>
          {revealedTasks.length === 0 ? (
            <div className="lab-fullscreen-solution-empty">Reveal a task to view its solution here.</div>
          ) : (
            revealedTasks.map((taskIndex) => {
              const task = tasks[taskIndex];
              if (!task) return null;
              return (
                <section key={task.id || taskIndex} className="lab-fullscreen-solution-card">
                  <h3>{task.label}</h3>
                  <LabSolution
                    task={task}
                    fallbackImage={question.sourceImage}
                    fallbackWidth={sourceWidth}
                    fallbackHeight={sourceHeight}
                  />
                </section>
              );
            })
          )}
        </div>
        {allSolutionsRevealed && (
          <section className="lab-rating-card lab-fullscreen-rating-card" aria-labelledby="lab-fullscreen-rating-heading">
            <div>
              <h2 id="lab-fullscreen-rating-heading">How did this lab go?</h2>
              <p>Your rating is saved for your next Labs review.</p>
            </div>
            <div className="lab-rating-actions" role="group" aria-label="Rate this lab">
              <button
                type="button"
                className="lab-rating-button rating-cli-note"
                onClick={onOpenScratchWorkspace}
                aria-label="Open CLI and notes"
              >
                CLI / Note
              </button>
              {["again", "solved"].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`lab-rating-button rating-${value} ${rating === value ? "selected" : ""}`}
                  onClick={() => onChooseRating(value)}
                >
                  {value === "again" ? "Again" : "Solved"}
                </button>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

function LabView({
  question,
  seqNumber,
  numQuestions,
  selectedBankName,
  candidateName,
  userId = null,
  userEmail = "",
  activeSessionId,
  onGoToQuestion,
  onExitToDashboard,
  isNavSaving = false,
  isPaused = false,
  onTogglePause,
  isFlagged = false,
  onToggleFlag,
  questions = [],
  answers = [],
  flaggedQuestions = [],
  labProgress = null,
  labProgressByQuestion = {},
  onLabProgressChange,
}) {
  const tasks = Array.isArray(question?.tasks) ? question.tasks : [];
  const labScratchpadKey = String(question?.id || question?.labNumber || seqNumber);
  const [revealedTasks, setRevealedTasks] = useState([]);
  const [rating, setRating] = useState(null);
  const [labNote, setLabNote] = useState("");
  const [fullscreenNotes, setFullscreenNotes] = useState([]);
  const [isScratchWorkspaceOpen, setIsScratchWorkspaceOpen] = useState(false);
  const [showReviewMatrix, setShowReviewMatrix] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const labViewRef = useRef(null);

  const persistLabScratchpad = (nextNotes, nextNote = labNote) => {
    if (!userId && !userEmail) return;
    const headers = { "Content-Type": "application/json", "Cache-Control": "no-cache, no-store, must-revalidate" };
    const token = localStorage.getItem("ccna_auth_token");
    if (token) headers.Authorization = `Bearer ${token}`;
    fetch(`${API_BASE_URL}/lab-scratchpads`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        userId,
        userEmail,
        candidateName,
        labKey: labScratchpadKey,
        notes: nextNotes,
        note: nextNote,
      }),
    }).catch((error) => console.warn("Could not save lab CLI/notes:", error));
  };

  useEffect(() => {
    const serverProgress = labProgress && typeof labProgress === "object" ? labProgress : null;
    const saved = serverProgress || readSavedProgress(activeSessionId || "local", question?.id || seqNumber);
    setRevealedTasks(Array.isArray(saved?.revealedTasks) ? saved.revealedTasks : []);
    setRating(saved?.rating || null);
    setLabNote(saved?.note || "");
    const savedNotes = Array.isArray(saved?.notes)
      ? normalizeFullscreenNotes(saved.notes)
      : saved?.note?.trim()
        ? [createFullscreenNote(0, saved.note)]
        : [];
    setFullscreenNotes(savedNotes);
    if (serverProgress && Array.isArray(serverProgress.notes) && serverProgress.notes.length > 0) {
      persistLabScratchpad(serverProgress.notes, serverProgress.note || "");
    }
    if (!serverProgress && saved) {
      onLabProgressChange?.(saved);
    }
  }, [activeSessionId, question?.id, seqNumber, labProgress, onLabProgressChange]);

  useEffect(() => {
    if (!userId && !userEmail) return undefined;
    const controller = new AbortController();
    const params = new URLSearchParams({ labKey: labScratchpadKey, _t: String(Date.now()) });
    if (userId) params.set("userId", String(userId));
    if (userEmail) params.set("userEmail", userEmail);
    const headers = { "Cache-Control": "no-cache, no-store, must-revalidate" };
    const token = localStorage.getItem("ccna_auth_token");
    if (token) headers.Authorization = `Bearer ${token}`;

    fetch(`${API_BASE_URL}/lab-scratchpads?${params.toString()}`, { headers, signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data?.found) return;
        setFullscreenNotes(normalizeFullscreenNotes(data.notes));
        setLabNote(typeof data.note === "string" ? data.note : "");
      })
      .catch((error) => {
        if (error?.name !== "AbortError") console.warn("Could not load saved lab CLI/notes:", error);
      });

    return () => controller.abort();
  }, [labScratchpadKey, userId, userEmail]);

  useEffect(() => {
    const syncFullscreenState = () => setIsFullscreen(document.fullscreenElement === labViewRef.current);
    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  const persistProgress = (nextRevealedTasks, nextRating, nextNote = labNote, nextFullscreenNotes = fullscreenNotes) => {
    const nextProgress = {
      revealedTasks: nextRevealedTasks,
      rating: nextRating,
      attemptStatus: nextRating === "again" ? "retry" : nextRating === "solved" ? "solved" : null,
      note: nextNote,
      notes: nextFullscreenNotes,
      updatedAt: Date.now(),
    };
    onLabProgressChange?.(nextProgress);
  };

  const saveLabWorkspace = (nextNotes) => {
    persistProgress(revealedTasks, rating, labNote, nextNotes);
    persistLabScratchpad(nextNotes, labNote);
  };

  const revealTask = (taskIndex) => {
    // Tasks must be opened in order so the lab behaves like a guided walkthrough.
    if (isPaused) return;
    if (taskIndex > revealedTasks.length) return;
    if (revealedTasks.includes(taskIndex)) return;
    const next = [...revealedTasks, taskIndex];
    setRevealedTasks(next);
    persistProgress(next, rating);
  };

  const chooseRating = (nextRating) => {
    if (isPaused) return;
    setRating(nextRating);
    persistProgress(revealedTasks, nextRating);
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (labViewRef.current?.requestFullscreen) {
        await labViewRef.current.requestFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  const allSolutionsRevealed = tasks.length > 0 && revealedTasks.length >= tasks.length;
  const canGoPrevious = seqNumber > 1;
  const canGoNext = seqNumber < numQuestions;
  const canProceed = allSolutionsRevealed;
  const initials = getCandidateInitials(candidateName);
  const bankLabel = selectedBankName || "Labs";
  const sourceWidth = question?.sourceWidth || 1312;
  const sourceHeight = question?.sourceHeight || 1199;
  const sourceDisplayWidth = question?.sourceDisplayWidth || sourceWidth;
  const sourceDisplayHeight = question?.sourceDisplayHeight || question?.topologyCropHeight || sourceHeight;
  const labNumber = question?.labNumber || seqNumber;
  const labItemLabel = "Complete the tasks below";
  const sourceParts = Array.isArray(question?.sourceParts) ? question.sourceParts : [];
  const topologyParts = sourceParts.filter((part) => /topology/i.test(`${part.id || ""} ${part.alt || ""}`));
  const taskReferenceParts = sourceParts.filter((part) => !/topology/i.test(`${part.id || ""} ${part.alt || ""}`));

  const handleNext = async () => {
    if (!canProceed || isNavSaving) return;
    if (canGoNext && onGoToQuestion) {
      await onGoToQuestion(seqNumber);
      return;
    }
    if (onExitToDashboard) onExitToDashboard();
  };

  const handlePrevious = async () => {
    if (isNavSaving || !canGoPrevious || !onGoToQuestion) return;
    await onGoToQuestion(seqNumber - 2);
  };

  return (
    <div ref={labViewRef} className={`boson-exsim-view lab-exsim-view ${isPaused ? "is-paused" : ""} ${isFullscreen ? "is-fullscreen" : ""}`}>
      <div className="boson-slim-transition-track" aria-hidden="true">
        <div className="boson-slim-transition-bar" />
        <div className="boson-slim-transition-glow" />
      </div>

      <div className="boson-top-bar">
        <div className="top-bar-left-actions">
          <button
            type="button"
            className="btn-boson-back"
            onClick={onExitToDashboard}
            title="Return to Exam Bank"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Exam</span>
          </button>
        </div>
        <div className="top-bar-right-group">
          <div className="boson-user-avatar" title={candidateName ? `Candidate: ${candidateName}` : "CCNA Candidate"}>
            <span>{initials}</span>
          </div>
        </div>
      </div>

      <div className="boson-exam-info-card lab-exam-info-card">
        <div className="boson-exam-context-row">
          <div className="top-bar-bank-tag context-bank-tag" title={`Currently attempting: ${bankLabel}`}>
            <span className="bank-tag-name">{bankLabel}</span>
          </div>
          <div className="context-actions">
            {onTogglePause && (
              <button
                type="button"
                className={`btn-boson-pause ${isPaused ? "is-paused" : ""}`}
                onClick={onTogglePause}
                title={isPaused ? "Resume Lab" : "Pause Lab"}
              >
                {isPaused ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                    <span>Pause</span>
                  </>
                )}
              </button>
            )}
            <div className={`btn-top-notes-summary ${labNote ? "has-notes" : ""}`} aria-label={`Lab notes (${labNote ? 1 : 0})`}>
              <span>💬 Notes ({labNote ? 1 : 0})</span>
            </div>
            <button
              type="button"
              className="btn-boson-action lab-fullscreen-button"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit full screen" : "Open lab in full screen"}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {isFullscreen ? (
                  <>
                    <polyline points="9 14 4 14 4 19" />
                    <polyline points="15 10 20 10 20 5" />
                    <line x1="4" y1="14" x2="10" y2="8" />
                    <line x1="20" y1="10" x2="14" y2="16" />
                  </>
                ) : (
                  <>
                    <polyline points="8 3 3 3 3 8" />
                    <polyline points="16 3 21 3 21 8" />
                    <polyline points="8 21 3 21 3 16" />
                    <polyline points="16 21 21 21 21 16" />
                  </>
                )}
              </svg>
              <span>{isFullscreen ? "Exit Full Screen" : "Full Screen"}</span>
            </button>
          </div>
        </div>

        <div className="boson-main-header">
          <div className="boson-title-bank-row">
            <h1 className="boson-exam-title">Cisco 200-301 CCNA Exam Simulator</h1>
          </div>
          <div className="boson-sub-header">
            <div className="boson-sub-right-actions">
              <button
                type="button"
                className="btn-boson-action lab-quick-review-button"
                onClick={() => setShowReviewMatrix(true)}
                title="Open quick question review"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
                <span>Question Review</span>
              </button>
              <button
                type="button"
                className="btn-boson-source-toggle"
                onClick={() => document.getElementById("lab-source-image")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                <svg className="source-svg-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>Original Source</span>
              </button>
              <button
                type="button"
                className={`btn-boson-note-toggle ${fullscreenNotes.length > 0 || labNote ? "has-active-note" : ""}`}
                onClick={() => setIsScratchWorkspaceOpen(true)}
              >
                <svg className="note-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>CLI / Note</span>
              </button>
              <button
                type="button"
                className={`btn-boson-flag ${isFlagged ? "is-flagged" : ""}`}
                onClick={() => onToggleFlag?.(seqNumber - 1)}
              >
                <svg className="flag-svg-icon flag-outline" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                </svg>
                <span>{isFlagged ? "Marked for Review" : "Mark for Review"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="boson-question-body lab-main-content">
        <section className="lab-question-card" aria-label="Lab topology and tasks">
          {isFullscreen ? (
            <LabFullscreenWorkspace
              question={question}
              seqNumber={seqNumber}
              tasks={tasks}
              revealedTasks={revealedTasks}
              labNumber={labNumber}
              labItemLabel={labItemLabel}
              sourceWidth={sourceWidth}
              sourceHeight={sourceHeight}
              sourceParts={sourceParts}
              topologyParts={topologyParts}
              revealTask={revealTask}
              onGoToQuestion={onGoToQuestion}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              isNavSaving={isNavSaving}
              rating={rating}
              onChooseRating={chooseRating}
              onOpenScratchWorkspace={() => setIsScratchWorkspaceOpen(true)}
            />
          ) : (
          <div className="lab-study-layout">
            <aside className="lab-topology-column" aria-label="Lab topology">
              <div className="lab-topology-heading">
                <span className="lab-section-caption">Lab No</span>
                <strong>{labNumber}</strong>
                <span className="lab-section-subtitle">Topology</span>
              </div>
              <div className="lab-topology-image-container">
                {sourceParts.length > 0 ? (
                  <div id="lab-source-image" className="lab-source-parts">
                    {(topologyParts.length > 0 ? topologyParts : sourceParts).map((part) => (
                      <LabImage key={part.id || part.src} src={part.src} alt={part.alt || "Original lab resource"} />
                    ))}
                  </div>
                ) : (
                  <div
                    id="lab-source-image"
                    className={`lab-source-frame ${question?.sourceDisplayHeight ? "lab-source-cropped" : "lab-source-complete"}`}
                    style={{ aspectRatio: `${sourceDisplayWidth} / ${sourceDisplayHeight}` }}
                  >
                    <LabImage
                      src={question?.sourceImage}
                      alt="Lab topology and tasks"
                      style={{ width: `${(sourceWidth / sourceDisplayWidth) * 100}%`, maxWidth: "none" }}
                    />
                  </div>
                )}
              </div>
            </aside>

            <div className="lab-tasks-column">

              {taskReferenceParts.length > 0 && (
                <div className="lab-task-reference" aria-label="Original task reference">
                  {taskReferenceParts.map((part) => (
                    <LabZoomableImage
                      key={part.id || part.src}
                      src={part.src}
                      alt={part.alt || "Original lab task reference"}
                      imageLabel="task reference"
                    />
                  ))}
                </div>
              )}

              <div className="lab-task-reveal-header">
            <div className="lab-task-heading-copy">
              <h2>{labItemLabel}</h2>
            </div>
            <span className="lab-task-progress">{Math.min(revealedTasks.length, tasks.length)} / {tasks.length} revealed</span>
          </div>

              <div className="lab-task-list">
            {tasks.map((task, taskIndex) => {
              const isRevealed = revealedTasks.includes(taskIndex);
              const isAvailable = taskIndex <= revealedTasks.length;
              return (
                <article key={task.id || taskIndex} className={`lab-task-card ${isRevealed ? "is-revealed" : ""} ${!isAvailable ? "is-locked" : ""}`}>
                  <div className="lab-task-sticky-content">
                    <button
                      type="button"
                      className="lab-task-toggle"
                      onClick={() => revealTask(taskIndex)}
                      disabled={!isAvailable || isRevealed}
                      aria-expanded={isRevealed}
                    >
                      <span className="lab-task-number">{taskIndex + 1}</span>
                      <span className="lab-task-copy">
                        <strong>{task.label}</strong>
                      </span>
                      <span className="lab-task-chevron" aria-hidden="true">{isRevealed ? "✓" : isAvailable ? "→" : "•"}</span>
                    </button>

                    <div className="lab-task-prompt">{task.text}</div>

                    {task.taskText && (
                      <pre className="lab-task-written-content">{task.taskText}</pre>
                    )}

                    {getImageList(task, "taskImages", "taskImage").length > 0 && (
                      <div className="lab-task-image-wrap lab-contiguous-image-strip">
                        {getImageList(task, "taskImages", "taskImage").map((image, imageIndex) => (
                          <LabZoomableImage
                            key={`${image}-${imageIndex}`}
                            src={image}
                            alt={`Reference ${imageIndex + 1} for ${task.label}`}
                            imageLabel={`task image ${imageIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {isRevealed && (
                    <div className="lab-solution-scroll" aria-label={`Scrollable solution for ${task.label}`}>
                      <div className="lab-solution-panel">
                        <div className="lab-solution-heading">Solution</div>
                        <LabSolution
                          task={task}
                          fallbackImage={question.sourceImage}
                          fallbackWidth={sourceWidth}
                          fallbackHeight={sourceHeight}
                        />
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

              {allSolutionsRevealed && (
            <section className="lab-rating-card" aria-labelledby="lab-rating-heading">
              <div>
                <span className="lab-rating-eyebrow">All solutions revealed</span>
                <h2 id="lab-rating-heading">How difficult was this lab?</h2>
                <p>Your rating is saved for your next Labs review.</p>
              </div>
              <div className="lab-rating-actions" role="group" aria-label="Rate this lab">
                {["again", "solved"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`lab-rating-button rating-${value} ${rating === value ? "selected" : ""}`}
                    onClick={() => chooseRating(value)}
                  >
                    {value === "again" ? "Again" : "Solved"}
                  </button>
                ))}
              </div>
            </section>
          )}

              <div className="lab-footer-actions">
            <button type="button" className="btn-boson-nav" onClick={onExitToDashboard}>Save & Exit</button>
            <div className="lab-footer-right-actions">
              <button
                type="button"
                className="btn-boson-nav"
                onClick={handlePrevious}
                disabled={!canGoPrevious || isNavSaving}
              >
                ← Previous Lab
              </button>
              <button type="button" className="btn-boson-action lab-footer-review-button" onClick={() => setShowReviewMatrix(true)}>
                Question Review
              </button>
              <button
                type="button"
                className={`btn-boson-action btn-lab-next ${!canProceed || isNavSaving ? "disabled" : ""}`}
                disabled={!canProceed || isNavSaving}
                onClick={handleNext}
              >
                {isNavSaving
                  ? "Saving…"
                  : !allSolutionsRevealed
                  ? "Reveal all tasks"
                  : canGoNext
                  ? "Next Lab →"
                  : "Finish Labs"}
              </button>
            </div>
              </div>
            </div>
          </div>
          )}
        </section>
      </main>

      <LabFullscreenScratchNotes
        notes={fullscreenNotes}
        onNotesChange={setFullscreenNotes}
        onSave={saveLabWorkspace}
        isOpen={isScratchWorkspaceOpen}
        onClose={() => setIsScratchWorkspaceOpen(false)}
      />

      {showReviewMatrix && (
        <QuestionPaletteModal
          numQuestions={numQuestions}
          currentIndex={seqNumber - 1}
          answers={answers}
          questions={questions}
          flaggedQuestions={flaggedQuestions}
          comments={{}}
          revealedQuestions={[]}
          committedQuestions={[]}
          isLabMode
          labProgressByQuestion={labProgressByQuestion}
          isReviewMode={false}
          onSelectQuestion={(targetIndex) => {
            setShowReviewMatrix(false);
            onGoToQuestion(targetIndex);
          }}
          onClose={() => setShowReviewMatrix(false)}
        />
      )}
      {isNavSaving && (
        <div className="lab-navigation-loading" role="status" aria-live="polite">
          <div className="lab-navigation-spinner" aria-hidden="true" />
          <span>Loading lab…</span>
        </div>
      )}
    </div>
  );
}

export default LabView;
