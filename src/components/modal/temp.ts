import React, { useRef, useState } from "react";
import {
  Box,
  Modal,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  Divider,
  IconButton,
  ArrowForwardIcon,
  Stack,
  FormControl,
  Popover,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  CircularProgress
} from "@mui/material";
import { useThemeMode } from "./../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 1,
};

const radioGroup = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 5,
};

const selectedStyle = {
  backgroundColor: "#d1dbf1",
  padding: "10px",
  borderRadius: "5px",
};

const bottomButtonAndSelection = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 2,
};

interface CreateScriptModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CreateScriptModal: React.FC<CreateScriptModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const { mode } = useThemeMode();
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const isFeatureSubmitDisabled = !title || !synopsis || !genre;
  const isShortSubmitDisabled = !title || !socialMedia || !content;

  const titleInputRef = useRef<null | HTMLInputElement>(null);

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        title,
        synopsis,
        genre,
        content,
        socialMedia,
      };

      const response = await createScript(data);

      if (response.success) {
        onRequestClose();
      } else {
        console.error("Error creating script", response.message);
      }
    } catch (error) {
      console.error("Error creating script", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestTitles = async () => {
    setLoading(true);
    try {
      const authDataString = localStorage.getItem("kt-auth-react-v");
      if (!authDataString) {
        throw new Error("User authentication data not found in localStorage");
      }

      const authData = JSON.parse(authDataString);
      const token = authData?.api_token;

      if (!token) {
        throw new Error("User token not found in authentication data");
      }

      const titles = await suggestTitles(token, { synopsis });
      setTitleSuggestions(titles);
      setAnchorEl(titleInputRef.current);
    } catch (error) {
      console.error("Error fetching title suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSelect = (selectedTitle: string) => {
    setTitle(selectedTitle);
    setAnchorEl(null);
  };

  const getBottomBorderStyle = () => ({
    "& .MuiOutlinedInput-root": {
      borderBottom: `2px solid ${
        mode === "dark" || mode === "system" ? "#fff" : "#000"
      }`,
      "&:hover fieldset": {
        borderBottomColor:
          mode === "dark" || mode === "system" ? "#fff" : "#000",
      },
      "&.Mui-focused fieldset": {
        borderBottomColor:
          mode === "dark" || mode === "system" ? "#fff" : "#000",
      },
      "& fieldset": {
        borderColor: "transparent",
      },
      "& .MuiInputBase-input": {
        color: mode === "dark" || mode === "system" ? "#fff" : "#000",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  });

  
  const getSelectStyles = () => ({
    "& .MuiOutlinedInput-root": {
      borderBottom: `2px solid ${
        mode === "dark" || mode === "system" ? "#fff" : "#000"
      }`,
      "&:hover fieldset": {
        borderBottomColor:
          mode === "dark" || mode === "system" ? "#fff" : "#000",
      },
      "&.Mui-focused fieldset": {
        borderBottomColor:
          mode === "dark" || mode === "system" ? "#fff" : "#000",
      },
      "& fieldset": {
        borderColor: "transparent",
      },
      "& .MuiInputBase-input": {
        color: mode === "dark" || mode === "system" ? "#fff" : "#000",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSvgIcon-root": {
      color: mode === "dark" || mode === "system" ? "#fff" : "#000",
    },
  });

  const modalStyle = {
    ...style,
    bgcolor: mode === "dark" || mode === "system" ? "#05090a" : "#fff",
    color: mode === "dark" || mode === "system" ? "#fff" : "#000",
  };

  const labelColor = mode === "dark" || mode === "system" ? "#fff" : "#000";

  const buttonStyles = {
    color: mode === "dark" || mode === "system" ? "#fff" : "#000",
    borderColor: mode === "dark" || mode === "system" ? "#fff" : "#000",
  };

  const radioIconStyle = {
    color: mode === "dark" || mode === "system" ? "#fff" : "#000",
  };

  const menuItemHoverStyle = {
    "&:hover": {
      backgroundColor: mode === "dark" || "system" ? "#414A4C" : "#f0f0f0",
      color: mode === "dark" || "system" ? "#fff" : "#000",
      border: mode === "dark" || "system" ? "2px solid #fff" : "2px solid #000",
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" id="modal-title" sx={{ color: labelColor }}>
            Create a new script
          </Typography>
          <IconButton onClick={onRequestClose}>
            <CancelIcon sx={radioIconStyle} />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} orientation="horizontal" />
        {step === 1 && (
          <Box sx={bottomButtonAndSelection}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "light",
                textAlign: "center",
                color: labelColor,
              }}
            >
              Select the format you want to write a script for:
            </Typography>
            <RadioGroup
              name="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              sx={radioGroup}
            >
              <FormControlLabel
                value="feature"
                control={<Radio sx={radioIconStyle} />}
                label="Feature Film"
                sx={format === "feature" ? selectedStyle : undefined}
              />
              <FormControlLabel
                value="short"
                control={<Radio sx={radioIconStyle} />}
                label="Short Film"
                sx={format === "short" ? selectedStyle : undefined}
              />
            </RadioGroup>
            <Button
              variant="outlined"
              onClick={handleNextStep}
              sx={{
                ...buttonStyles,
                mt: 2,
              }}
              disabled={!format}
            >
              Next
            </Button>
          </Box>
        )}
        {step === 2 && format === "feature" && (
          <Box sx={bottomButtonAndSelection}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={getBottomBorderStyle()}
              inputRef={titleInputRef}
            />
            <TextField
              label="Synopsis"
              variant="outlined"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={getBottomBorderStyle()}
            />
            <TextField
              label="Genre"
              variant="outlined"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              fullWidth
              sx={getBottomBorderStyle()}
            />
            <Stack direction="row" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                onClick={handlePreviousStep}
                sx={buttonStyles}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={buttonStyles}
                disabled={isFeatureSubmitDisabled || loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Stack>
          </Box>
        )}
        {step === 2 && format === "short" && (
          <Box sx={bottomButtonAndSelection}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={getBottomBorderStyle()}
              inputRef={titleInputRef}
            />
            <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
              <InputLabel sx={{ color: labelColor }}>Select Social Media</InputLabel>
              <Select
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value as string)}
                sx={getSelectStyles()}
              >
                <MenuItem value="facebook" sx={menuItemHoverStyle}>
                  Facebook
                </MenuItem>
                <MenuItem value="instagram" sx={menuItemHoverStyle}>
                  Instagram
                </MenuItem>
                <MenuItem value="tiktok" sx={menuItemHoverStyle}>
                  TikTok
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Content"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={getBottomBorderStyle()}
            />
            <Stack direction="row" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                onClick={handlePreviousStep}
                sx={buttonStyles}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={buttonStyles}
                disabled={isShortSubmitDisabled || loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Stack>
          </Box>
        )}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List>
            {titleSuggestions.map((suggestion, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleTitleSelect(suggestion)}
              >
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Popover>
      </Box>
    </Modal>
  );
};

export default CreateScriptModal;
