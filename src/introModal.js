import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import './index.css';

function IntroModal() {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button>Quick Note</Button>}
        >
            <Header icon>
                <Icon name='language'/>
                A quick note on borders
            </Header>
            <Modal.Content>
                <p>
                    This site only considers the languages spoken in a country as a whole
                    or stated as an official language of that nation. Regional dialects
                    and languages may not be shown in countries in which they exist.
                    Those languages which exist in certain regions, states and/or territories
                    are not accurately represented here, and linguistic and ethnic lines should not
                    be derived from this data.

                    Countries with dark red colorings have disputed borders with other countries,
                    and are therefore possibly subject to change in the future.

                    Thanks!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button className='introModalButton' color='grey' inverted onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Okay
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default IntroModal
