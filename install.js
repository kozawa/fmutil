var err = initInstall("fmutil v0.0.15", 'fmutil', '0.0.15');
logComment("initInstall: " + err);

var dir = getFolder(getFolder("Current User", "chrome"), "fmutil");
addDirectory("fmutil", "chrome", dir, "");
registerChrome(CONTENT | PROFILE_CHROME, dir, "content/");


if (err == SUCCESS) {
    err = performInstall();
	if (err == SUCCESS)
	{;}
	else
		alert(errcode(err));
}
else
    cancelInstall(err);

// this function converts an error number to the error code
function errcode(errornum)
{
    if (errornum == 0)  {
        errorstring = "SUCCESS";
    }
    else if (errornum == -200)  {
        errorstring = "BAD_PACKAGE_NAME";
    }
    else if (errornum == -201) {
        errorstring = "UNEXPECTED_ERROR";
    }
    else if (errornum == -202) {
        errorstring = "ACCESS_DENIED";
    }
    else if (errornum == -203) {
        errorstring = "TOO_MANY_CERTIFICATES";
    }
    else if (errornum == -204) {
        errorstring = "NO_INSTALL_SCRIPT";
    }
    else if (errornum == -205) {
        errorstring = "NO_CERTIFICATE";
    }
    else if (errornum == -206) {
        errorstring = "NO_MATCHING_CERTIFICATE";
    }
    else if (errornum == -207) {
        errorstring = "CANT_READ_ARCHIVE";
    }
    else if (errornum == -208) {
        errorstring = "INVALID_ARGUMENTS";
    }
    else if (errornum == -209) {
        errorstring = "ILLEGAL_RELATIVE_PATH";
    }
    else if (errornum == -210) {
        errorstring = "USER_CANCELLED";
    }
    else if (errornum == -211) {
        errorstring = "INSTALL_NOT_STARTED";
    }
    else if (errornum == -212) {
        errorstring = "SILENT_MODE_DENIED";
    }
    else if (errornum == -213) {
        errorstring = "NO_SUCH_COMPONENT";
    }
    else if (errornum == -214) {
        errorstring = "DOES_NOT_EXIST";
    }
    else if (errornum == -215) {
        errorstring = "READ_ONLY";
    }
    else if (errornum == -216) {
        errorstring = "IS_DIRECTORY";
    }
    else if (errornum == -217) {
        errorstring = "NETWORK_FILE_IS_IN_USE";
    }
    else if (errornum == -218) {
        errorstring = "APPLE_SINGLE_ERR";
    }
    else if (errornum == -219) {
        errorstring = "INVALID_PATH_ERR";
    }
    else if (errornum == -220) {
        errorstring = "PATCH_BAD_DIFF";
    }
    else if (errornum == -221) {
        errorstring = "PATCH_BAD_CHECKSUM_TARGET";
    }
    else if (errornum == -222) {
        errorstring = "PATCH_BAD_CHECKSUM_RESULT";
    }
    else if (errornum == -223) {
        errorstring = "UNINSTALL_FAILED";
    }
    else if (errornum == -224) {
        errorstring = "PACKAGE_FOLDER_NOT_SET";
    }
    else if (errornum == -225) {
        errorstring = "EXTRACTION_FAILED";
    }
    else if (errornum == -226) {
        errorstring = "FILENAME_ALREADY_USED";
    }
    else if (errornum == -227) {
        errorstring = "INSTALL_CANCELLED";
    }
    else if (errornum == -228) {
        errorstring = "DOWNLOAD_ERROR";
    }
    else if (errornum == -229) {
        errorstring = "SCRIPT_ERROR";
    }
    else if (errornum == -230) {
        errorstring = "ALREADY_EXISTS";
    }
    else if (errornum == -231) {
        errorstring = "IS_FILE";
    }
    else if (errornum == -232) {
        errorstring = "SOURCE_DOES_NOT_EXIST";
    }
    else if (errornum == -233) {
        errorstring = "SOURCE_IS_DIRECTORY";
    }
    else if (errornum == -234) {
        errorstring = "SOURCE_IS_FILE";
    }
    else if (errornum == -235) {
        errorstring = "INSUFFICIENT_DISK_SPACE";
    }
    else if (errornum == -236) {
        errorstring = "FILENAME_TOO_LONG";
    }
    else if (errornum == -237) {
        errorstring = "UNABLE_TO_LOCATE_LIB_FUNCTION";
    }
    else if (errornum == -238) {
        errorstring = "UNABLE_TO_LOAD_LIBRARY";
    }
    else if (errornum == -239) {
        errorstring = "CHROME_REGISTRY_ERROR";
    }
    else if (errornum == -240) {
        errorstring = "MALFORMED_INSTALL";
    }
    else if (errornum == -299) {
        errorstring = "OUT_OF_MEMORY";
    }
    else if (errornum == 999) {
        errorstring = "REBOOT_NEEDED";
    }
    else if (errornum == -5550) {
        errorstring = "GESTALT_UNKNOWN_ERROR";
    }
    else if (errornum == -5551) {
        errorstring = "GESTALT_INVALID_ARGUMENT";
    }
    else {
        errorstring = "Error No. " + errornum;
    }

    return(errorstring);
}