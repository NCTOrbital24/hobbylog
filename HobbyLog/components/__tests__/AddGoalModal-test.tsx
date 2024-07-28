import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddGoalModal from "../HobbyCreation/AddGoalModal";

describe("AddGoalModal", () => {
    const mockGoal = {
        name: "Test Goal",
        description: "This is a test goal.",
        deadline: new Date(),
        exp: 10,
    };

    const mockGoals = [mockGoal];

    const mockSetGoals = jest.fn();
    const mockCloseModal = jest.fn();

    it("renders correctly with initial state", () => {
        const { getByPlaceholderText, getByText } = render(
            <AddGoalModal
                visible={true}
                closeModal={mockCloseModal}
                goal={mockGoal}
                goals={mockGoals}
                setGoals={mockSetGoals}
            />
        );

        expect(getByPlaceholderText("Goal name").props.value).toBe("Test Goal");
        expect(getByPlaceholderText("Goal description").props.value).toBe(
            "This is a test goal."
        );
        expect(getByText("Deadline: " + mockGoal.deadline.toLocaleDateString())).toBeTruthy();
        expect(getByPlaceholderText("Exp reward").props.value).toBe("10");
    });

    it("handles input changes", () => {
        const { getByPlaceholderText } = render(
            <AddGoalModal
                visible={true}
                closeModal={mockCloseModal}
                goal={mockGoal}
                goals={mockGoals}
                setGoals={mockSetGoals}
            />
        );

        fireEvent.changeText(getByPlaceholderText("Goal name"), "New Goal");
        fireEvent.changeText(getByPlaceholderText("Goal description"), "New description");
        fireEvent.changeText(getByPlaceholderText("Exp reward"), "20");

        expect(getByPlaceholderText("Goal name").props.value).toBe("New Goal");
        expect(getByPlaceholderText("Goal description").props.value).toBe("New description");
        expect(getByPlaceholderText("Exp reward").props.value).toBe("20");
    });

    it("validates goal before saving", () => {
        const { getByText } = render(
            <AddGoalModal
                visible={true}
                closeModal={mockCloseModal}
                goal={{ ...mockGoal, name: "", deadline: null }}
                goals={mockGoals}
                setGoals={mockSetGoals}
            />
        );

        fireEvent.press(getByText("Save Goal"));

        expect(getByText("Invalid Goal!")).toBeTruthy();
    });

    it("calls saveGoal function correctly", () => {
        const { getByText } = render(
            <AddGoalModal
                visible={true}
                closeModal={mockCloseModal}
                goal={mockGoal}
                goals={mockGoals}
                setGoals={mockSetGoals}
            />
        );

        fireEvent.press(getByText("Save Goal"));

        expect(mockSetGoals).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
    });

    it("calls deleteGoal function correctly", () => {
        const { getByText } = render(
            <AddGoalModal
                visible={true}
                closeModal={mockCloseModal}
                goal={mockGoal}
                goals={mockGoals}
                setGoals={mockSetGoals}
            />
        );

        fireEvent.press(getByText("Delete Goal"));

        expect(mockSetGoals).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
    });

    it("closes modal on close button press", () => {
        const { getByText } = render(
            <AddGoalModal
                visible={true}
                closeModal={mockCloseModal}
                goal={mockGoal}
                goals={mockGoals}
                setGoals={mockSetGoals}
            />
        );

        fireEvent.press(getByText("Close"));

        expect(mockCloseModal).toHaveBeenCalled();
    });
});
