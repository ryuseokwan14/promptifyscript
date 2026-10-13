import React, { useMemo } from "react";

export interface HighlightedPromptTextProps {
  prompt: string;
  location?: string | null;
  script?: string | null;
  className?: string;
}

interface MatchRange {
  start: number;
  end: number;
  type: "location" | "script";
}

interface TextSegment {
  text: string;
  type: "text" | "location" | "script";
}

export function parsePromptSegments(
  prompt: string,
  location?: string | null,
  script?: string | null
): TextSegment[] {
  if (!prompt) return [];

  const loc = location?.trim();
  const scr = script?.trim();

  if (!loc && !scr) {
    return [{ text: prompt, type: "text" }];
  }

  const ranges: MatchRange[] = [];

  // Match location ranges
  if (loc && loc.length > 0) {
    let pos = 0;
    while (pos < prompt.length) {
      const idx = prompt.indexOf(loc, pos);
      if (idx === -1) break;
      ranges.push({
        start: idx,
        end: idx + loc.length,
        type: "location",
      });
      pos = idx + loc.length;
    }
  }

  // Match script ranges
  if (scr && scr.length > 0) {
    let pos = 0;
    while (pos < prompt.length) {
      const idx = prompt.indexOf(scr, pos);
      if (idx === -1) break;
      ranges.push({
        start: idx,
        end: idx + scr.length,
        type: "script",
      });
      pos = idx + scr.length;
    }
  }

  if (ranges.length === 0) {
    return [{ text: prompt, type: "text" }];
  }

  // Sort ranges by start position
  ranges.sort((a, b) => a.start - b.start);

  // Filter out any overlapping ranges (keep earlier one)
  const nonOverlapping: MatchRange[] = [];
  let lastEnd = 0;
  for (const r of ranges) {
    if (r.start >= lastEnd) {
      nonOverlapping.push(r);
      lastEnd = r.end;
    }
  }

  // Build segmented output
  const segments: TextSegment[] = [];
  let currentIndex = 0;

  for (const r of nonOverlapping) {
    if (r.start > currentIndex) {
      segments.push({
        text: prompt.slice(currentIndex, r.start),
        type: "text",
      });
    }
    segments.push({
      text: prompt.slice(r.start, r.end),
      type: r.type,
    });
    currentIndex = r.end;
  }

  if (currentIndex < prompt.length) {
    segments.push({
      text: prompt.slice(currentIndex),
      type: "text",
    });
  }

  return segments;
}

export function HighlightedPromptText({
  prompt,
  location,
  script,
  className = "",
}: HighlightedPromptTextProps) {
  const segments = useMemo(
    () => parsePromptSegments(prompt, location, script),
    [prompt, location, script]
  );

  return (
    <span className={className}>
      {segments.map((segment, idx) => {
        if (segment.type === "location") {
          return (
            <span
              key={`loc-${idx}`}
              className="inline box-decoration-clone px-1.5 py-0.5 rounded-md bg-secondary/15 text-secondary border border-secondary/30 font-medium transition-colors"
              title="Tempat / Lokasi"
            >
              {segment.text}
            </span>
          );
        }

        if (segment.type === "script") {
          return (
            <span
              key={`scr-${idx}`}
              className="inline box-decoration-clone px-1.5 py-0.5 rounded-md bg-tertiary/15 text-tertiary border border-tertiary/30 font-medium transition-colors"
              title="Naskah Lip-Sync / Dialog"
            >
              {segment.text}
            </span>
          );
        }

        return <React.Fragment key={`txt-${idx}`}>{segment.text}</React.Fragment>;
      })}
    </span>
  );
}
