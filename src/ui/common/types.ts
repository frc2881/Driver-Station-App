import { 
  NetworkTablesTopic 
} from "../../common/types";

export type NetworkTablesTopicSelectionChanged = {
  selected: boolean;
  row: NetworkTablesTopic;
}