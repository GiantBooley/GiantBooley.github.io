'use strict';

(function() {

  function init() {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        localStorage.setItem("hasCodeRunBefore", true);
        var shepherd = setupShepherd();
        setTimeout(function() {
            shepherd.start();
        }, 400);
    }
  }

  function setupShepherd() {
    var shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        }
      },
      // This should add the first tour step
      steps: [
        {
            text: 'Welcome to the GauGAN2 tutorial.',
            buttons: [
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'To proceed, please review the Terms and Conditions and agree to them.',
            attachTo: {
                element: '#agreement',
                on: 'top'
              },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'This allows you to choose which modalities to provide as input to GauGAN2. ' +
            'You can select any combination of segmentation, sketch, image, and text as input. ' +
            'Let us begin by using just text as input. Please unselect segmentation and only select text.',
            attachTo: {
              element: '#input_util',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'inputs'
        },
        {
            text: 'Now, let us enter a text prompt, e.g. mountains next to a lake',
            attachTo: {
              element: '#input_util',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'inputs'
        },
        {
            text: 'Click here to generate the output image.',
            attachTo: {
              element: '.render',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'Congratulations! You have created your first output.',
            attachTo: {
            element: '#main_frame_div',
            on: 'top'
            },
            buttons: [
            {
                action: function() {
                return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action: function() {
                return this.next();
                },
                text: 'Next'
            }
            ],
            id: 'colors'
        },
        {
            text: 'Click here to randomly sample a different style for the output image.',
            attachTo: {
              element: '.random',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'Or base the output style on a chosen style image.',
            attachTo: {
              element: '.example0',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'Click next when you are happy with the output image and want to proceed.',
            attachTo: {
            element: '#main_frame_div',
            on: 'top'
            },
            buttons: [
            {
                action: function() {
                return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action: function() {
                return this.next();
                },
                text: 'Next'
            }
            ],
            id: 'colors'
        },
        {
            text: 'Let us copy the output image to our input canvas so that we can do more cool things with it!',
            attachTo: {
            element: '#copy',
            on: 'top'
            },
            buttons: [
            {
                action: function() {
                return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action: function() {
                return this.next();
                },
                text: 'Next'
            }
            ],
            id: 'colors'
        },
        {
            text: 'Suppose we like the mountain, but not the sky. Let us remove the sky and add more clouds!',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Click on the image eraser tool to remove regions that look like the sky',
            attachTo: {
              element: '#image_eraser',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Or alternatively, use the magic wand tool to automatically remove regions similar to selected parts of the image',
            attachTo: {
              element: '#inpaint',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Now, click on the sky regions in the input canvas to select them for removal.',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Let us compute the segmentation map of the current output and then modify it!',
            attachTo: {
              element: '#get_segment',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'This helps you paint a segmentation class color.',
            attachTo: {
              element: '#brush',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'brush'
        },
        {
            text: 'This fills an entire region with the selected segmentation class color.',
            attachTo: {
              element: '#fill',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'fill'
        },
        {
            text: 'You can select segmentation class colors from this list.',
            attachTo: {
              element: '#category.btn-group',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Let us add some clouds to the sky by selecting the appropriate segmentation class color, followed by the segmentation paint brush and fill tools.',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Let us select the modified segmentation map as an additional input. Note that the previous output image is also being used as an input since we copied it to the input canvas.',
            attachTo: {
              element: '#input_util',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'inputs'
        },
        {
            text: 'Click here to generate the output image with more clouds.',
            attachTo: {
              element: '.render',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'The output image should now have a cloudy sky. You can try a few more random styles if you would like.',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Let us compute the edges present in the image so that we can modify them to add more details to our output image. Click the highlighted button.',
            attachTo: {
              element: '#get_sketch',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'Add some more details to your mountain by selecting the sketch pencil tool.',
            attachTo: {
              element: '#pencil',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'pencil'
        },
        {
            text: 'Or remove unwanted edges using the sketch eraser tool.',
            attachTo: {
              element: '#eraser',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'pencil'
        },
        {
            text: 'Click next once you are ready to produce your modified output image.',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'In addition to the previously selected inputs, let us also select the modified sketches as an input.',
            attachTo: {
              element: '#input_util',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'inputs'
        },
        {
            text: 'Click here to generate the new output image.',
            attachTo: {
              element: '.render',
              on: 'bottom'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'welcome'
        },
        {
            text: 'Awesome! See how your newly added edges have changed the previous output.',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'You can change which layers are visualized in the input canvas in order to improve clarity of a particular item.',
            attachTo: {
              element: '#input_vis',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'You can download the inputs or the output image by clicking on the appropriate button.',
            attachTo: {
              element: '#save',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            text: 'You can also upload previously downloaded segmentation maps and edges, or your own landscape or style images.',
            attachTo: {
              element: '#upload',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.next();
                },
                text: 'Next'
              }
            ],
            id: 'colors'
        },
        {
            title: 'Done',
            text: 'Congratulations on completing a brief tutorial on GauGAN2. Explore more features of the tool and create new masterpieces!',
            attachTo: {
              element: '#main_frame_div',
              on: 'top'
            },
            buttons: [
              {
                action: function() {
                  return this.back();
                },
                secondary: true,
                text: 'Back'
              },
              {
                action: function() {
                  return this.cancel();
                },
                text: 'Finish tutorial'
              }
            ],
            id: 'including'
          }
      ],
      useModalOverlay: true
    });

    // This should add steps after the ones added with `addSteps`
    return shepherd;
  }

  function ready() {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }

  function run_tutorial() {
    var shepherd = setupShepherd();
    setTimeout(function() {
        shepherd.start();
    }, 400);
  }
  document.getElementById("run_tutorial").onclick = run_tutorial;

  ready();
}).call(void 0);
