import { useEffect } from "preact/hooks";

const HelmetHead = () => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://socialdigitalcommerce.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/tod1zk/b/5/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-GB&collectorId=9d52fcb7";
    script.async = true;
    document.body.appendChild(script);
  }, [])

  return null;
}

export default HelmetHead;