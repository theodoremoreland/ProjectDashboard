// React
import React, { useEffect, useState } from "react";

// Third party
import ReactMarkdown from "react-markdown/with-html";
import { useQuery } from "@tanstack/react-query";

// Controller
import { fetchReadme } from "./README.controller";
import extractErrorMessage from "../../utils/extractErrorMessage";

// Custom Styles
import "./README.css";

const README = ({ name, link }) => {
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
    <ReactMarkdown
      className="readme"
      allowDangerousHtml
      children={readmeString}
    />
  );
};

export default README;
