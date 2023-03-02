import { Dropdown } from "reactjs-dropdown-component";
import styled from "styled-components";
import "../Styles/Components.css";

// Override default styling of dropdown
const StyledParent = styled.div`
  & .dd-wrapper {
    position: relative;
    width: 250px;
    font-size: 20px;
    user-select: none;
  }

  & .dd-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border: 1px solid rgb(223, 223, 223);
    border-radius: 3px;
    background-color: white;
    line-height: 38px;
    cursor: default;
    cursor: pointer;
  }

  & .dd-header-title {
    margin: 10px;
    font-weight: 300;
    font-size: 20px;
    line-height: 100%;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  & .dd-scroll-list {
    overflow-y: scroll;
    max-height: 215px;
    padding: 0px !important;
  }

  & .dd-list {
    position: absolute;
    z-index: 10;
    width: 100%;
    max-height: 215px;
    border: 1px solid rgb(223, 223, 223);
    border-top: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
    background-color: white;
    font-weight: 300;
    text-align: left;
    -webkit-overflow-scrolling: touch;
  }

  & .dd-list-item {
    display: inline-block !important;
    overflow: hidden !important;
    width: 100% !important;
    padding: 6px 6px !important;
    font-size: 20px !important;
    line-height: 100% !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    cursor: default !important;
    cursor: pointer !important;
  }
`;

export default function List({ onChange, title, name, list }) {
  return (
    <StyledParent>
      <Dropdown name={name} title={title} list={list} onChange={onChange} />
    </StyledParent>
  );
}
