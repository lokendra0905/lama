// "use client";
// import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
// import { Box, Center, Spinner } from "@chakra-ui/react";

// import { useCookies } from "react-cookie";

// import { motion, AnimatePresence } from "framer-motion";

// import { usePathname, useRouter } from "next/navigation";
// import { indexOf } from "lodash";
// import { useUserStore } from "../store/user";
// import { LOCAL_STORAGE_KEYS, LOGIN_URL, STATUS } from "@/constants";
// import { setSchoolHeader } from "@/services/apis";
// import { useSchoolStore } from "@/store/school";

// const cookiePath = "isfaergfg";
// const PUBLIC_PATHS = ["/login", "/register", "/sysadmin/login"];
// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const isServerSide = typeof window === "undefined";
//   const router = useRouter();
//   const path = usePathname();
//   const [checkAuth, setCheckAuth] = useState(false);
//   const [cookie, setCookie, removeCookie] = useCookies();
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   useEffect(() => {
//     const checktoken = cookie[cookiePath];
//     if (!checktoken) {
//       setCheckAuth(true);
//     }
//     else {

//     }
//   }, [cookie]);

//   const fetchingUserData = false;
//   const {
//     loginUserAction,
//     loginStatus,
//     resetOtpToken,
//     userData,
//     sysAdminLoginAction,
//     sysAdminloginStatus,
//     resetSysAdminOtpToken,
//   } = useUserStore((s) => ({
//     loginUserAction: s.loginUserAction,
//     loginStatus: s.loginStatus,
//     userData: s.userData,
//     resetOtpToken: s.resetOtpToken,
//     sysAdminLoginAction: s.sysAdminLoginAction,
//     sysAdminloginStatus: s.sysAdminloginStatus,
//     resetSysAdminOtpToken: s.resetSysAdminOtpToken,
//   }));

//   const { getStandardsAction, getSectionsAction, getSubjectsAction, getSingleSchoolAction, getStandardsStatus, getSectionsStatus, getSingleSchoolStatus } =
//     useSchoolStore((s) => ({
//       getStandardsAction: s.getStandardsAction,
//       getStandardsStatus: s.getStandardsStatus,
//       getSectionsAction: s.getSectionsAction,
//       getSectionsStatus: s.getSectionsStatus,
//       getSubjectsAction: s.getSubjectsAction,
//       getSingleSchoolAction: s.getSingleSchoolAction,
//       getSingleSchoolStatus: s.getSingleSchoolStatus,
//     }));

//   useEffect(() => {
//     if (userData) {
//       setSchoolHeader(userData?.schoolId);
//     }
//   }, [userData]);

//   const isCheckSysAdmin = useMemo(
//     () => (userData && userData.isSysadmin ? true : false),
//     [userData]
//   );
//   const schoolId = useMemo(() => userData && userData.schoolId, [userData]);
//   useEffect(() => {
//     if (!isCheckSysAdmin && schoolId) {
//       getStandardsAction();
//       getSectionsAction();
//       getSubjectsAction();
//       getSingleSchoolAction({ id: schoolId });
//     }
//   }, [isCheckSysAdmin, schoolId, getStandardsAction, getSectionsAction, getSingleSchoolAction, getSubjectsAction]);

//   useEffect(() => {
//     if (!isServerSide && !userData) {
//       const isPublicPath = indexOf(PUBLIC_PATHS, path) !== -1;
//       const localToken = localStorage.getItem(LOCAL_STORAGE_KEYS.loginToken);
//       const loginType = localStorage.getItem(LOCAL_STORAGE_KEYS.loginType);
//       if (localToken && !isPublicPath) {
//         if (loginType === "loginDetails") {
//           loginUserAction({ rtoken: localToken }, false);
//         } else if (loginType === "isSysadmin") {
//           sysAdminLoginAction({ rtoken: localToken }, false);
//         }
//       }
//       else if (!localToken && !isPublicPath) {
//         router.push(LOGIN_URL.SCHOOL_LOGIN);
//       }
//     }
//   }, [isServerSide, path, loginUserAction, userData, sysAdminLoginAction, router]);

//   useEffect(() => {
//     if (loginStatus === STATUS.FAILED) {
//       router.push(LOGIN_URL.SCHOOL_LOGIN, () => resetOtpToken());
//     }
//     else if (sysAdminloginStatus === STATUS.FAILED) {
//       router.push(LOGIN_URL.SYSADMIN_LOGIN, () => resetOtpToken());
//     }
//   }, [loginStatus, router, resetOtpToken, sysAdminloginStatus]);

//   const loginSuccess = useCallback(() => { }, []);

//   const logout = useCallback(() => {
//     const isConfirm = confirm("Logout?");

//     if (isConfirm) {
//       removeCookie(cookiePath);
//       window.open("/", "_self");
//     }
//   }, [removeCookie]);

//   const contextValue = useMemo(() => {
//     return {
//       isAuthenticated,
//       setIsAuthenticated,
//       loginSuccess,
//       logout,
//     };
//   }, [isAuthenticated, loginSuccess, logout]);

//   const isLoading = useMemo(() => !checkAuth || getStandardsStatus === STATUS.FETCHING || getSectionsStatus === STATUS.FETCHING || getSingleSchoolStatus === STATUS.FETCHING, [checkAuth, getStandardsStatus, getSingleSchoolStatus, getSectionsStatus]);
//   const isPublicPath = useMemo(() => indexOf([...PUBLIC_PATHS, "/login"], path) !== -1, [path])

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {isLoading ? (
//         <Loader />
//       ) : ((isAuthenticated && userData) || isPublicPath) ? (
//         <Box>
//           <AnimatePresence>
//             <motion.section
//               key="content"
//               initial="collapsed"
//               animate="open"
//               exit="collapsed"
//               variants={{
//                 open: { opacity: 1, marginLeft: 0 },
//                 collapsed: { opacity: 0 },
//               }}
//               transition={{ duration: 0.5, ease: [0.04, 0.4, 0.8, 0.98] }}
//             >
//               {children}
//             </motion.section>
//           </AnimatePresence>
//         </Box>
//       ) : fetchingUserData === STATUS.FETCHING ? (
//         <Loader />
//       ) : null}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// const Loader = (props) => {
//   return (
//     <Center zIndex={999999999} pos="fixed" top="0px" bg="gray.50" h="100vh" w="100vw" {...props}>
//       <Spinner />
//     </Center>
//   );
// };
