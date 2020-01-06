import React from 'react';
import classNames from 'classnames';

const Timeline = ({ children, className, tag: Tag, ...rest }) => (
	<Tag className={classNames('timeline', className)} {...rest}>
		{children}
	</Tag>
);

Timeline.defaultProps = {
	tag: 'ul'
};

export default Timeline;
