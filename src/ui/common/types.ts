import { 
  NetworkTablesTopic 
} from "../../common/types";

export type RowSelectionChanged = {
  selected: boolean;
  row: NetworkTablesTopic;
}