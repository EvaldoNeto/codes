(require 'yasnippet)
(yas-global-mode 1)

;; define a function to initialize auto-complete-c-headers
(defun my:ac-c-header-init()
  (require 'auto-complete-c-headers)
  (add-to-list 'ac-sources 'ac-source-c-headers)
  (add-to-list 'achead:include-directories '"/usr/lib/gcc/x86_64-linux-gnu/5/include"))

;; call this function from c/c++ hooks
(add-hook 'c++-mode-hook 'my:ac-c-header-init)
(add-hook 'c-mode-hook 'my:ac-c-header-init)
;; turn on semantic
(semantic-mode 1)
;; define a function which adds semantic as a suggestion backend to auto complete
;; and hook this function to c-mode-common-hook
(defun my:add-semantic-to-autocomplete()
  (add-to-list 'ac-sources 'ac-source-semantic)
  )
(add-hook 'c-mode-common-hook 'my:add-semantic-to-autocomplete)

;; turn on ede mode
(global-ede-mode 1)
;; create a project for our program
(ede-cpp-root-project "my project" :file "/home/biga/codes/cpp_code/src/main.cpp"
		      :include-path '("/../my_inc")) 
