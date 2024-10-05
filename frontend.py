import sys
from PyQt5 import QtWidgets
from mydesign import Ui_MainWindow  # Replace 'your_script_file' with the actual file name

class MainWindow(QtWidgets.QMainWindow, Ui_MainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.setupUi(self)  # This initializes the UI components

if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    main_window = MainWindow()
    main_window.show()
    sys.exit(app.exec_())
