import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { Hit } from "@algolia/client-search";
import algoliasearch from "algoliasearch/lite";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID as string,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY as string
);

type AutocompleteItem = Hit<{
  title: string;
  year: number;
  poster: string;
  genres: string[];
  objectID: string;
}>;

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteItem>>
) {
  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle",
  });
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: "movies",
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "movies",
                      query,
                      params: {
                        hitsPerPage: 8,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return "/movies/" + item.objectID;
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

  React.useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapper">
          <input
            className="aa-Input"
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          />
        </div>
      </form>

      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            "aa-Panel",
            "aa-Panel--desktop",
            autocompleteState.status === "stalled" && "aa-Panel--stalled",
          ]
            .filter(Boolean)
            .join(" ")}
          {...autocomplete.getPanelProps({})}
        >
          <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <li
                            key={item.objectID}
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            <LinkContainer to={`/movie/${item.objectID}`}>
                              <div className="aa-ItemWrapper">
                                <div className="aa-ItemContent">
                                  <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
                                    <img
                                      src={item.poster}
                                      alt={item.title}
                                      width="60"
                                    />
                                  </div>
                                  <div className="aa-ItemContentBody">
                                    <div className="aa-ItemContentTitle">
                                      {item.title} - <i>{item.year}</i>
                                    </div>
                                    <div className="aa-ItemContentDescription">
                                      <strong>{item.genres.join(", ")}</strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </LinkContainer>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
