// React
import React, { useEffect, useState } from "react";

// Third party
import ReactMarkdown from "react-markdown/with-html";
import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";

// Controller
import { fetchReadme } from "./README.controller";
import extractErrorMessage from "../../../utils/extractErrorMessage";

// Custom Styles
import "./README.css";

export default function README({
  name,
  link,
  readmeIsActive,
  setReadmeIsActive,
}) {
  const [readmeString, setReadmeString] = useState(undefined);

  const { data } = useQuery({
    queryKey: ["readme", name, link],
    queryFn: () => fetchReadme(name, link),
    onError: (err) => console.error(extractErrorMessage(err)),
    cacheTime: 300_000,
    staleTime: 240_000,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setReadmeString(data);
    }
  }, [data]);

  return (
    <>
      {readmeIsActive ? (
        <>
          {/* The div: "clickAwayArea" is used to mimic clickAway event such that the readme closes
                        when the user clicks something other than the readme itself. */}
          <div
            className="readmeClickAwayArea"
            onClick={() => setReadmeIsActive(false)}
          />
          <Alert
            className="readme"
            onClose={() => setReadmeIsActive(false)}
            dismissible
          >
            <ReactMarkdown allowDangerousHtml children={readmeString} />
          </Alert>
        </>
      ) : (
        ""
      )}
    </>
  );
}
