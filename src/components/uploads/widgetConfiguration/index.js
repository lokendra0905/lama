import { Loader } from "@/common/Loader";
import { STATUS } from "@/constants";
import { useProjectStore } from "@/store/project";
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { find } from "lodash";
import React, { useEffect, useMemo } from "react";
import { Header } from "../Header";
import { GeneralTab } from "./GeneralTab";
import { DisplayTab } from "./DisplayTab";

export const WidgetConfiguration = ({ id }) => {
  const { getProjectAction, getProjectStatus, projectData } = useProjectStore((s) => ({
    getProjectAction: s.getProjectAction,
    getProjectStatus: s.getProjectStatus,
    projectData: s.projectData,
  }));

  const Project = useMemo(() => find(projectData, (p) => p._id == id), [projectData]);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("userData"));
    if (!Project) {
      getProjectAction({ user: email });
    }
  }, [Project]);
  return (
    <Loader loading={getProjectStatus === STATUS.FETCHING}>
      {Project && (
        <Box px={3}>
          <Header name={Project?.name} page="Widget Configurations" />
          <Box px={3}>
            <Heading color={"purple.600"} mt={10}>
              Configuration
            </Heading>
            <Tabs colorScheme={"purple"} mt={10} size={"lg"}>
              <TabList fontWeight={"bold"}>
                <Tab fontSize={"large"}>General</Tab>
                <Tab fontSize={"large"}>Display</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <GeneralTab />
                </TabPanel>
                <TabPanel>
                  <DisplayTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
    </Loader>
  );
};
